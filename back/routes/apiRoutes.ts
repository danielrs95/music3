import express from "express";
import dotenv from "dotenv";

const router = express.Router();
dotenv.config();

router.get("/search", async (req, res) => {
  const { id } = req.query;

  try {
    const response = await fetch(
      // eslint-disable-next-line max-len
      `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${id}&key=${process.env.API_KEY}`
    );
    const responseJson = await response.json();
    let { nextPageToken } = responseJson;
    const responseItems: any[] = []

    while (nextPageToken) {
      const nextResponse: any = await fetch(
        // eslint-disable-next-line max-len
        `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${id}&key=${process.env.API_KEY}&pageToken=${nextPageToken}`
      )
      const nextResponseJson = await nextResponse.json()
      nextPageToken  = nextResponseJson.nextPageToken;
      nextResponseJson.items.map((item: any ) => responseItems.push(item.snippet.title))
    }

    return res.json(responseItems);
  } catch (error) {
    return res.status(400).send("playlist id missing");
  }
});

router.get("*", (_, res) => {
  return res.status(400).send("endpoint not available");
});

export default router;
