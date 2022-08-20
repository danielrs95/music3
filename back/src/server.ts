import express from "express";

const app = express();

app.use(express.json());

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});