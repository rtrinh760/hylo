import OpenAI from "openai";

export async function POST(req) {

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const body = await req.json();
  const messages = body.messages;

  const completionOutput = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: messages,
    temperature: 0.5,
    frequency_penalty: 0.5,
  });

  const completionResponse =
    completionOutput.choices[0].message?.content.trim() ||
    "Error occurred. Please try again.";

  return Response.json({ text: completionResponse });
}
