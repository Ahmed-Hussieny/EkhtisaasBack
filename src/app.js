// src/app.js

import { config } from "dotenv";
import express from "express";
import cors from "cors";
import fs from 'fs';
import https from 'https';
import db_Connection from "../DB/connection.js";
import UserRoute from "./modules/User/user.routes.js";
import { globalResponse } from "./middleWares/globalResponce.js";
import MainSpecialtyRouter from "./modules/MainSpecialty/MainSpecialty.routes.js";
import SubSpecialtyRouter from "./modules/SubSpecialty/SubSpecialty.routes.js";
import CertificateRouter from "./modules/Certificate/Certificate.routes.js";
import directEducationRouter from "./modules/directEducation/directEducation.routers.js";
import selfEducationRouter from "./modules/selfEducation/selfEducation.routes.js";
import supportSideRouter from "./modules/supportSide/supportSide.routes.js";
import AdvisorRouter from "./modules/Advisor/Advisor.routes.js";
import SpecialistRouter from "./modules/Specialist/Specialist.routes.js";

const app = express();
const corsOptions = {
  origin: ['https://ekhtisaas.com', 'http://localhost:3000','https://webeu.info','http://ekhtisaas.com','http://localhost:3001'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json());

config();
db_Connection();

app.use('/user', UserRoute);
app.use('/MainSpecialty', MainSpecialtyRouter);
app.use('/SubSpecialty', SubSpecialtyRouter);
app.use('/Certificate', CertificateRouter);
app.use('/directEducation', directEducationRouter);
app.use('/selfEducation', selfEducationRouter);
app.use('/supportSide', supportSideRouter);
app.use('/Advisor', AdvisorRouter);
app.use('/Specialist', SpecialistRouter);

app.use(globalResponse);

export default app;
