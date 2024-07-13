import { config } from "dotenv";
import fs from "fs";
import https from "https";
import app from "./src/app.js";

config();
const port = process.env.PORT || 3000;

const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/srv548846.hstgr.cloud/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/srv548846.hstgr.cloud/fullchain.pem')
};

app.get("/", async (req, res, next) => {
  return res.json({
    status: 200,
    message: "Welcome to Ekhtisaas ..!",
  });
});

https.createServer(options, app).listen(port, () => {
  console.log(`HTTPS server running on port ${port}`);
});
