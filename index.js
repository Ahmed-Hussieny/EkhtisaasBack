import { config } from "dotenv";
import app from "./src/app.js";

config();
const port = process.env.PORT || 3000;

// // Path to your SSL certificate and key
// const options = {
//   key: fs.readFileSync('/etc/letsencrypt/live/srv548846.hstgr.cloud/privkey.pem'),
//   cert: fs.readFileSync('/etc/letsencrypt/live/srv548846.hstgr.cloud/fullchain.pem')
// };

app.get("/", async (req, res, next) => {
  return res.json({
    status: 200,
    message: "Welcome to Ekhtisaas ..!",
  });
});

// https.createServer(options, app).listen(port, "0.0.0.0" ,() => {
//   console.log(`HTTPS server running on port ${port}`);
// });

app.listen(port, "0.0.0.0" ,() => {
    console.log(`HTTPS server running on port ${port}`);
  });
  