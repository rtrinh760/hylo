import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const formSchema = z.object({
  link: z.string(),
  lang: z.string().min(2),
});

export default function Home() {
    const router = useRouter()
    const { status } = useSession()

  if (status == "unauthenticated") {
    router.push("/")
  }


  const [currentVideoId, setCurrentVideoId] = useState("");
  const [lang, setLang] = useState("");
  // const [subtitles, setSubtitles] = useState([]);
  // const [currentSubtitle, setCurrentSubtitle] = useState("");
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
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
    setLang(values.lang);

    // const fetchedSubtitles = await getSubtitles({ currentVideoId: currentVideoId, lang: lang });

    if (fetchedSubtitles.length === 0) {
      console.log("failed getting subtitles");
      toast({
        title: 'No track for language specified.',
        description: 'Please try again.',
        variant: 'destructive'
      });
      return;
    }
  };

  return (
    <div className="overflow-auto overscroll-y-none">
      <div className="flex min-h-screen w-screen flex-col border">
        <div className="flex items-center border h-20">
          <h1 className="ml-10 text-3xl">Hylo</h1>
        </div>

        <main className="mt-4 mb-20 flex flex-col justify-center items-center">
          <div className="my-4">
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col space-y-2 justify-center">
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
                      <Select {...field}>
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
                <Button type="submit"> Find Video </Button>
              </div>
            </form>
          </div>
          {/* <div className="border-t-2 pt-4 h-8 w-3/4 font-semibold text-2xl text-center align-middle">
            {currentSubtitle}
          </div> */}
        </main>
      </div>
      <Toaster />
    </div>
  );
}
