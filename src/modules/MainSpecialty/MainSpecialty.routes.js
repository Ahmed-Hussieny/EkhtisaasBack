import { Router } from "express";
import { auth } from "../../middleWares/auth.middleware.js";
import * as MainSpecialtyController from "./MainSpecialty.controller.js";
import { MainSpecialtyRoles } from "./MainSpecialty.endpoints.roles.js";
import { mullterMiddleHost } from "../../middleWares/multer.js";
import { allowedExtensions } from "../../utils/allowedExtensions.js";
import expressAsyncHandler from "express-async-handler";

const MainSpecialtyRouter = Router();

MainSpecialtyRouter.post(
  "/AddMainSpecialty",
  auth(MainSpecialtyRoles.AddMainSpecialty),
  mullterMiddleHost({
    extension: allowedExtensions.image,
  }).single("Image"),
  expressAsyncHandler(MainSpecialtyController.AddMainSpecialty)
);

MainSpecialtyRouter.put(
  "/updateMainSpecialty/:id",
  auth(MainSpecialtyRoles.updateMainSpecialty),
  mullterMiddleHost({
    extension: allowedExtensions.image,
  }).single("Image"),
  expressAsyncHandler(MainSpecialtyController.updateMainSpecialty)
);

MainSpecialtyRouter.delete(
  "/DeleteMainSpecialty/:id",
  auth(MainSpecialtyRoles.DeleteMainSpecialty),
  expressAsyncHandler(MainSpecialtyController.DeleteMainSpecialty)
);

MainSpecialtyRouter.get(
  "/GetAllMainSpecialties",
  expressAsyncHandler(MainSpecialtyController.GetAllMainSpecialties)
);
MainSpecialtyRouter.get(
  "/GetSingleMainSpecialty/:id",
  expressAsyncHandler(MainSpecialtyController.GetSingleMainSpecialty)
);

export default MainSpecialtyRouter;
