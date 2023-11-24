"use client";
import Image from "next/image";
import useState from "react-usestateref";
import user from "../../public/user.svg";
import scholar from "../../public/scholar.svg";
import { UploadButton } from "@uploadthing/react";
import { Document } from "react-pdf";

const ChatMessage = ({ text, messenger }) => {
  return (
    <>
      {messenger === "user" && (
        <div className="bg-white p-4 rounded-lg flex gap-4 items-center whitespace-pre-wrap">
          <Image src={user} alt="user" height={32} width={32} />
          <p className="text-black">{text}</p>
        </div>
      )}
      {messenger === "ai" && (
        <div className="bg-gray-200 p-4 rounded-lg flex gap-4 items-center whitespace-pre-wrap">
          <Image src={scholar} alt="scholar" height={32} width={32} />
          <p className="text-black">{text}</p>
        </div>
      )}
    </>
  );
};

const ChatInput = ({ onSubmit, disabled }) => {
  const [input, setInput] = useState("");

  const submitInput = () => {
    onSubmit(input);
    setInput("");
  };

  const handleEnterKey = (event) => {
    // ignore submit if input is empty
    if (event.code === "Enter" && input !== "") {
      submitInput();
    }
  };

  return (
    <div className="bg-white border-2 p-2 rounded-lg flex">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full px-3 text-gray-800 rounded-lg focus:outline-none"
        type="text"
        placeholder="Enter Prompt"
        disabled={disabled}
        onKeyDown={(e) => handleEnterKey(e)}
      />
    </div>
  );
};

export default function App() {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [fileLink, setFileLink] = useState("");
  const [messages, setMessages, messagesRef] = useState([]);
  const [_, setApiMessages, apiMessagesRef] = useState([
    { role: "system", content: "You are a helpful assistant." },
  ]);
  const [loading, setLoading] = useState(false);

  const queryApi = async (input) => {
    setLoading(true);

    const userMessage = {
      text: input,
      messenger: "user",
      key: new Date().getTime(),
    };

    setMessages([...messagesRef.current, userMessage]);
    setApiMessages([
      ...apiMessagesRef.current,
      { role: "user", content: input },
    ]);

    const gptResponse = await fetch("/api/gpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: apiMessagesRef.current }),
    }).then((gptResponse) => gptResponse.json());

    setLoading(false);

    if (gptResponse.text) {
      const gptMessage = {
        text: gptResponse.text,
        messenger: "ai",
        key: new Date().getTime(),
      };
      setMessages([...messagesRef.current, gptMessage]);
      setApiMessages([
        ...apiMessagesRef.current,
        { role: "system", content: gptResponse.text },
      ]);
    } else {
      return new Response("Error occurred.", { status: 400 });
    }
  };

  return (
    <main className="relative mx-auto">
      <nav className="border w-full py-2 px-4 flex flex-row items-center justify-center space-x-4">
        <ChatInput onSubmit={(input) => queryApi(input)} disabled={loading} />
        <UploadButton
          endpoint="pdfUploader"
          onClientUploadComplete={(res) => {
            console.log("Files: ", res);
            alert("Upload completed");
            setFileUploaded(true);
            setFileLink(res.url);
          }}
          onUploadError={(error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
      </nav>
      <Document file="https://utfs.io/f/e3ad037e-12e0-4b96-9c2b-ff6b734ebd51-6l49rl.pdf" />

      <div className="w-full border mt-5 px-4">
        {messages.map((message) => (
          <ChatMessage
            key={message.key}
            text={message.text}
            messenger={message.messenger}
          />
        ))}
        {messages.length == 0 && (
          <p className="text-center text-2xl text-bold text-black">
            Enter a prompt above or upload a pdf to get started!
          </p>
        )}
      </div>
    </main>
  );
}
