import { config } from "dotenv";
import express from "express";
import cors from "cors"; 
import db_Connection from "../DB/connection.js";
import UserRoute from "./modules/User/user.routes.js";
import { globalResponse } from "./middleWares/globalResponce.js";
const app = express();
app.use(cors({ origin: 'http://localhost:3001' }));

app.use(express.json())
config();
db_Connection()
app.use('/user', UserRoute)
app.use(globalResponse)

export default app;