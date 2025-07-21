// import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormControl } from "@/components/ui/form";
import { FormField } from "@/components/ui/form";
import { FormItem } from "@/components/ui/form";
import { Select } from "@/components/ui/select";
import { SelectContent } from "@/components/ui/select";
import { SelectGroup } from "@/components/ui/select";
import { SelectItem } from "@/components/ui/select";
import { SelectTrigger } from "@/components/ui/select";
import { SelectValue } from "@/components/ui/select";
import { linkParser } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { videoSchema } from "@/lib/schemas";
import localFont from "next/font/local";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { Subtitle, SubtitleOutput } from "youtube-captions-scraper";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import { Footer } from "@/components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  const { status } = useSession();
  const router = useRouter();
  const { toast } = useToast();

  const [currentVideoId, setCurrentVideoId] = useState("");
  const videoRef = useRef<ReactPlayer>(null);
  const [subtitles, setSubtitles] = useState<SubtitleOutput>();
  const [currentSubtitle, setCurrentSubtitle] = useState<Subtitle>();

  const form = useForm<z.infer<typeof videoSchema>>({
    resolver: zodResolver(videoSchema),
    defaultValues: {
      link: "",
      lang: "",
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (videoRef) {
        const currentTime = videoRef.current?.getCurrentTime();

        if (subtitles && currentSubtitle && currentTime) {
          for (let i = 0; i < subtitles.length; i++) {
            const startTime = Number(subtitles[i].start);
            const endTime = startTime + Number(subtitles[i].dur);
            if (currentTime >= startTime && currentTime < endTime) {
              setCurrentSubtitle(subtitles[i]);
              break;
            }
          }
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [subtitles, currentSubtitle]);

  if (status === "loading") {
    return null;
  }
  if (status === "unauthenticated") {
    router.push("/");
    return null;
  }

  const onSubmit = async (values: z.infer<typeof videoSchema>) => {
    const parsedVideoId = linkParser(values.link);

    if (parsedVideoId.length == 0) {
      toast({
        title: "Invalid link!",
        description: "Please try again.",
        variant: "destructive",
      });
      return;
    }

    setCurrentVideoId(parsedVideoId);

    const response = await fetch(
      `/api/subtitles?videoID=${parsedVideoId}&lang=${values.lang}`
    );

    if (response?.status == 500) {
      toast({
        title: "No track for language specified.",
        description: "Please try again.",
        variant: "destructive",
      });
      return;
    }

    const subtitlesResponse = await response.json();
    setSubtitles(subtitlesResponse);
    setCurrentSubtitle(subtitlesResponse[0]);
  };

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)]`}
    >
      <NavigationMenu className="h-[10vh] flex max-w-full w-full mt-6 mb-10 px-10 justify-between">
        <div className="flex flex-row items-center space-x-1">
          <h1 className="text-3xl">Hylo</h1>
          <svg
            data-slot="icon"
            fill="none"
            strokeWidth="1.5"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802"
            ></path>
          </svg>
        </div>
        <Button variant="secondary" onClick={() => signOut()}>
          Sign Out
        </Button>
      </NavigationMenu>
      <main className="h-[80vh] flex flex-col items-center justify-center">
        {currentVideoId && (
          <ReactPlayer
            ref={videoRef}
            url={`https://www.youtube.com/watch?v=${currentVideoId}`}
            controls={true}
          />
        )}
        <div className="font-semibold text-6xl text-center align-middle">
          {currentSubtitle?.text}
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-2"
          >
            <div className="flex flex-row space-x-2">
              <FormField
                control={form.control}
                name="link"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="YouTube Link"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lang"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      {...field}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Language" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="en"> English </SelectItem>
                          <SelectItem value="ja"> Japanese </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            <Button variant="secondary" type="submit">
              Find Video
            </Button>
          </form>
        </Form>
      </main>
      <Footer className="h-[10vh]" />
      <Toaster />
    </div>
  );
}
