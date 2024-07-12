import { config } from "dotenv";
import fs from 'fs';
import https from 'https';
import app from "./src/app.js";

config();

const port = 443; // Change to port 443

// SSL Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/ekhtisaas.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/ekhtisaas.com/fullchain.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/ekhtisaas.com/fullchain.pem', 'utf8');

const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca
};

app.get("/", async (req, res, next) => {
  return res.json({
    status: 200,
    message: "Welcome to Ekhtisaas ..!",
  });
});

https.createServer(credentials, app).listen(port, () => {
  console.log(`Server running on port ${port} with HTTPS`);
});
