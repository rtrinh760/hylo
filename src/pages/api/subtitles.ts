import { NextApiRequest, NextApiResponse } from "next";
import { YoutubeTranscript } from "youtube-transcript";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

async function validateRequest(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({
      error: "You must be signed in to view the protected content on this page.",
    });
    return false;
  }
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
    return false;
  }
  const { videoID, lang } = req.query;
  if (!videoID || !lang) {
    res.status(400).json({ error: "Missing videoID or lang parameter" });
    return false;
  }
  return { videoID: videoID as string, lang: lang as string };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const validated = await validateRequest(req, res);
  if (!validated) return;
  const { videoID, lang } = validated;

  try {
    const subtitles = await YoutubeTranscript.fetchTranscript(videoID, {
      lang: lang,
    });
    console.log("Raw subtitles response:", subtitles);
    res.status(200).json(subtitles);
  } catch (error) {
    console.error("Failed to fetch subtitles:", error);
    res.status(500).json({ error: "Failed to fetch subtitles", details: error });
  }
}
