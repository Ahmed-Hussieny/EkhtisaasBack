import { config } from "dotenv";
import express from "express";
import app from "./src/app.js";
config()
const port = process.env.PORT
app.listen(port, () => {
    console.log(`server running on port ${port}`);
})