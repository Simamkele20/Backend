import express from "express";
import { multiQuery } from "../models/index.js";

const multiQueryRouter = express.Router();
await multiQuery.initialize();

multiQueryRouter.get("/games", async (req, res) => {
  try {
    multiQuery.fetchDisplayAll(req, res);
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: "failed to retrieve Data.",
    });
  }
});

multiQueryRouter.get("/games/:id", async (req, res) => {
  try {
    multiQuery.fetchDisplayByID(req, res);
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: "failed to retrieve Data.",
    });
  }
});


export { multiQueryRouter, express };
