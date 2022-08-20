import express from "express";
import apiRouter from "../routes/api";

const app = express();

app.use(express.json());

const PORT = 5000;

app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
