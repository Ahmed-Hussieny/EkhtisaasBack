import { config } from "dotenv";
import express from "express";
import app from "./src/app.js";
config();
const port = process.env.PORT;
app.get("/", async (req, res, next) => {
  return res.json({
    status: 200,
    message: "Welcome in Ekhtisaas ..!",
  });
});
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
