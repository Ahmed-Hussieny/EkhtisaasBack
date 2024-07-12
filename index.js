import { config } from "dotenv";
import express from "express";
import https from "https";
import http from "http";
import fs from "fs";
import app from "./src/app.js";

config();

const httpsPort = process.env.HTTPS_PORT || 443; // HTTPS port
const httpPort = process.env.HTTP_PORT || 80; // HTTP port

// HTTPS options: You need to provide your SSL certificate and private key
const httpsOptions = {
  key: fs.readFileSync("./private.key"),
  cert: fs.readFileSync("./certificate.crt"),
};

// Create HTTPS server
const httpsServer = https.createServer(httpsOptions, app);

httpsServer.listen(httpsPort, () => {
  console.log(`HTTPS Server running on port ${httpsPort}`);
});

// Create HTTP server to redirect to HTTPS
const httpApp = express();

httpApp.get("*", (req, res) => {
  res.redirect(`https://${req.headers.host}${req.url}`);
});

const httpServer = http.createServer(httpApp);

httpServer.listen(httpPort, () => {
  console.log(`HTTP Server running on port ${httpPort}`);
});
