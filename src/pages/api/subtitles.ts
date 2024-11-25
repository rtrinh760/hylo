import { NextApiRequest, NextApiResponse } from "next";
import { getSubtitles } from "youtube-captions-scraper";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({
      error:
        "You must be signed in to view the protected content on this page.",
    });
  }

  if (req.method === "GET") {
    const { videoID, lang } = req.query;

    if (!videoID || !lang) {
      return res
        .status(400)
        .json({ error: "Missing videoID or lang parameter" });
    }

    try {
      const subtitlesResponse = await getSubtitles({
        videoID: videoID as string,
        lang: lang as string,
      });

      return res.status(200).json(subtitlesResponse);
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
