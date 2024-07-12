import { config } from "dotenv";
import express from "express";
import https from "https";
import fs from "fs";
import app from "./src/app.js";

config();

const port = process.env.PORT || 443; // Use the desired HTTPS port

// HTTPS options: You need to provide your SSL certificate and private key
const httpsOptions = {
  key: fs.readFileSync("./private.key"),
  cert: fs.readFileSync("./certificate.crt"),
};

// Create HTTPS server
const server = https.createServer(httpsOptions, app);

server.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});