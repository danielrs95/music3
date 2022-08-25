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
    const { items } = responseJson;

    const titlesToSearch = items.map((item: any) => item.snippet.title);

    console.log(titlesToSearch);

    return res.json(titlesToSearch);
  } catch (error) {
    return res.status(400).send("playlist id missing");
  }
});

router.get("*", (_, res) => {
  return res.status(400).send("endpoint not available");
});

export default router;
