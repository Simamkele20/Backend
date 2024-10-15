import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { multiQueryRouter } from "./controller/MultiQueryController.js";

import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = +process.env.PORT || 4000


app.use(
  cors({
    origin: "http://localhost:4200", // Allow requests only from this origin
    methods: ["GET", "POST"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

app.use(express.static(path.join(__dirname, "./static")));


app.use("/", multiQueryRouter);
app.get("^/$|/game", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "./static/index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
