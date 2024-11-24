import { z } from "zod";

export const videoSchema = z.object({
  link: z.string(),
  lang: z.string().min(2),
});
