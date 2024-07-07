import { Router } from "express";
import * as SpecialistController from './Specialist.controller.js';
import { mullterMiddleHost } from "../../middleWares/multer.js";
import { SpecialistRoles } from "./Specialist.endpoint.roles.js";
import { allowedExtensions } from "../../utils/allowedExtensions.js";
import expressAsyncHandler from "express-async-handler";
import { auth } from "../../middleWares/auth.middleware.js";

const SpecialistRouter = Router()


SpecialistRouter.post(
    "/AddSpecialist",
    auth(SpecialistRoles.AddSpecialist),
    mullterMiddleHost({
      extension: allowedExtensions.image,
    }).single("Image"),
    expressAsyncHandler(SpecialistController.AddSpecialist)
  );


  SpecialistRouter.put(
    "/updateSpecialist/:id",
    auth(SpecialistRoles.updateSpecialist),
    mullterMiddleHost({
      extension: allowedExtensions.image,
    }).single("Image"),
    expressAsyncHandler(SpecialistController.updateSpecialist)
  );


SpecialistRouter.delete('/deleteSpecialist/:id',auth(SpecialistRoles.DeleteSpecialist), expressAsyncHandler(SpecialistController.DeleteSpecialist))
SpecialistRouter.get('/GetAllSpecialists',auth(SpecialistRoles.GetSpecialist), expressAsyncHandler(SpecialistController.GetAllSpecialists))

SpecialistRouter.get('/GetSingleSpecialist/:id',auth(SpecialistRoles.GetSpecialist), expressAsyncHandler(SpecialistController.GetSingleSpecialist))

export default SpecialistRouter