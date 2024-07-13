import { config } from "dotenv";
import express from "express";
import cors from "cors"; 
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

config();
const app = express();

app.use(cors({ origin: ['https://ekhtisaas.com'] }));

app.use(express.json());

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
