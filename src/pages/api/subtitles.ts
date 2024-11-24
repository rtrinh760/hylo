import { NextApiRequest, NextApiResponse } from 'next';
import { getSubtitles } from 'youtube-captions-scraper';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { videoID, lang } = req.query;

        if (!videoID || !lang) {
            return res.status(400).json({ error: 'Missing videoID or lang parameter' });
        }

        try {
            const subtitlesResponse = await getSubtitles({
                videoID: videoID as string,
                lang: lang as string,
            });

            return res.status(200).json(subtitlesResponse);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Failed to fetch subtitles' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
}