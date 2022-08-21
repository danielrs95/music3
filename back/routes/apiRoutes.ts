import express from "express";
import dotenv from "dotenv";

const router = express.Router();
dotenv.config();

router.get("/", (_, res) => {
  res.status(200);
});

router.get("/search", async (req, res) => {
  const { id } = req.query;

  try {
    const response = await fetch(
      // eslint-disable-next-line max-len
      `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${id}&key=${process.env.API_KEY}`
    );
    const responseJson = await response.json();
    const { items } = responseJson;

    const titlesToSearch = items.map((item: any) => item.snippet.title);

    console.log(titlesToSearch);

    return res.json(responseJson);
  } catch (error) {
    throw error;
  }
});

export default router;
