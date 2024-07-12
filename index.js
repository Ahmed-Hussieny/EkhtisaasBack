// import { config } from "dotenv";
// import express from "express";
// import https from "https";
// import fs from "fs";
// import app from "./src/app.js";

// config();

// const port = process.env.PORT || 443; // Use the desired HTTPS port

// // HTTPS options: You need to provide your SSL certificate and private key
// const httpsOptions = {
//   key: fs.readFileSync("./private.key"),
//   cert: fs.readFileSync("./certificate.crt"),
// };

// // Create HTTPS server
// const server = https.createServer(httpsOptions, app);

// server.listen(port, '0.0.0.0', () => {
//   console.log(`Server running on port ${port}`);
// });

// Import necessary modules
import { config } from "dotenv";
import express from "express";
import https from "https";
import fs from "fs";
import cors from "cors";
import db_Connection from "./DB/connection.js";
// import UserRoute from "../src/modules/User/user.routes.js";
// import MainSpecialtyRouter from "./modules/MainSpecialty/MainSpecialty.routes.js";
// import SubSpecialtyRouter from "./modules/SubSpecialty/SubSpecialty.routes.js";
// import CertificateRouter from "./modules/Certificate/Certificate.routes.js";
// import directEducationRouter from "./modules/directEducation/directEducation.routers.js";
// import selfEducationRouter from "./modules/selfEducation/selfEducation.routes.js";
// import supportSideRouter from "./modules/supportSide/supportSide.routes.js";
// import AdvisorRouter from "./modules/Advisor/Advisor.routes.js";
// import SpecialistRouter from "./modules/Specialist/Specialist.routes.js";
// import { globalResponse } from "./middleWares/globalResponce.js";
import UserRoute from "./src/modules/User/user.routes.js";
import MainSpecialtyRouter from "./src/modules/MainSpecialty/MainSpecialty.routes.js";
import SubSpecialtyRouter from "./src/modules/SubSpecialty/SubSpecialty.routes.js";
import CertificateRouter from "./src/modules/Certificate/Certificate.routes.js";
import directEducationRouter from "./src/modules/directEducation/directEducation.routers.js";
import selfEducationRouter from "./src/modules/selfEducation/selfEducation.routes.js";
import supportSideRouter from "./src/modules/supportSide/supportSide.routes.js";
import AdvisorRouter from "./src/modules/Advisor/Advisor.routes.js";
import SpecialistRouter from "./src/modules/Specialist/Specialist.routes.js";
import { globalResponse } from "./src/middleWares/globalResponce.js";

// Initialize dotenv
config();

// Initialize Express app
const app = express();

// Middleware setup
app.use(cors({
  origin: [
    'http://localhost:3001',
    'http://localhost:3000',
    'https://ekhtisaas.com' 
  ]
}));
app.use(express.json());

// Database connection
db_Connection();

// Routes setup
app.use('/user', UserRoute);
app.use('/MainSpecialty', MainSpecialtyRouter);
app.use('/SubSpecialty', SubSpecialtyRouter);
app.use('/Certificate', CertificateRouter);
app.use('/directEducation', directEducationRouter);
app.use('/selfEducation', selfEducationRouter);
app.use('/supportSide', supportSideRouter);
app.use('/Advisor', AdvisorRouter);
app.use('/Specialist', SpecialistRouter);

// Global middleware
app.use(globalResponse);

// HTTPS options: Replace with your SSL certificate and private key paths
const httpsOptions = {
  key: fs.readFileSync("./private.key"),
  cert: fs.readFileSync("./certificate.crt"),
};

// HTTPS server creation
const port = process.env.PORT || 443;
const server = https.createServer(httpsOptions, app);

// Start server
server.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});

// Export the Express app for testing or other uses
export default app;
