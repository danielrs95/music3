import express from "express";
import dotenv from "dotenv";

const router = express.Router();
dotenv.config();

router.get("/", async (_, res) => {
  try {
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&key=${process.env.API_KEY}`
    );
    const responseJson = await response.json();
    return res.json(responseJson);
  } catch (error) {
    throw error;
  }
});

export default router;
