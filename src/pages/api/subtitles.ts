import { NextApiRequest, NextApiResponse } from "next";
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
  console.log("lang", lang);
  console.log("videoID", videoID);
  try {
    // TODO: may need to change api key due to free tier
    const response = await fetch("https://www.youtube-transcript.io/api/transcripts", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${process.env.YOUTUBE_TRANSCRIPT_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ids: [videoID],
      }),
    });
    const data: YouTubeTranscriptApiResponseArray = await response.json();
    res.status(200).json(data[0].tracks[0].transcript);
  } catch (error) {
    console.error("Failed to fetch subtitles:", error);
    res.status(500).json({ error: "Failed to fetch subtitles", details: error });
  }
}

export interface TranscriptEntry {
  start: string;
  dur: string;
  text: string;
  [key: string]: unknown;
}

export interface SubtitleTrack {
  language: string;
  transcript: TranscriptEntry[];
  [key: string]: unknown;
}

export interface LanguageInfo {
  label: string;
  languageCode: string;
}

export interface YouTubeTranscriptApiResponse {
  id: string;
  microformat: {
    playerMicroformatRenderer: Record<string, unknown>;
  };
  isLive: boolean;
  isLoginRequired: boolean;
  languages: LanguageInfo[];
  playabilityStatus: {
    status: string;
    reason: string;
  };
  title: string;
  tracks: SubtitleTrack[];
  [key: string]: unknown;
}

export type YouTubeTranscriptApiResponseArray = YouTubeTranscriptApiResponse[];
