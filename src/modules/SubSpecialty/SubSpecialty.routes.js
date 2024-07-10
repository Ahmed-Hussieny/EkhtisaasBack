import { Router } from "express";
import * as SubSpecialtyController from "./SubSpecialty.controller.js";
import { SubSpecialtyRoles } from "./SubSpecialty.endpoints.roles.js";
import { mullterMiddleHost } from "../../middleWares/multer.js";
import { allowedExtensions } from "../../utils/allowedExtensions.js";
import { auth } from "../../middleWares/auth.middleware.js";
import expressAsyncHandler from "express-async-handler";

const SubSpecialtyRouter = Router()
SubSpecialtyRouter.post(
    "/AddSubSpecialty",
    auth(SubSpecialtyRoles.AddSubSpecialty),
    mullterMiddleHost({
        extension: allowedExtensions.image,
    }).single("Image"),
    expressAsyncHandler(SubSpecialtyController.AddSubSpecialty)
);

SubSpecialtyRouter.put(
    "/updateSubSpecialty/:id",
    auth(SubSpecialtyRoles.updateSubSpecialty),
    mullterMiddleHost({
        extension: allowedExtensions.image,
    }).single("Image"),
    expressAsyncHandler(SubSpecialtyController.updateSubSpecialty)
);

SubSpecialtyRouter.delete(
    "/DeleteSubSpecialty/:id",
    auth(SubSpecialtyRoles.DeleteSubSpecialty),
    expressAsyncHandler(SubSpecialtyController.DeleteSubSpecialty)
  );
  SubSpecialtyRouter.get(
    "/GetAllSubSpecialties",
   
    expressAsyncHandler(SubSpecialtyController.GetAllSubSpecialties)
  );
  SubSpecialtyRouter.get(
    "/GetSingleSubSpecialty/:id",
   
    expressAsyncHandler(SubSpecialtyController.GetSingleSubSpecialty)
  );
export default SubSpecialtyRouter