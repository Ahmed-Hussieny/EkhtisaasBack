import { Router } from "express";
import * as DirectEducationController from "./directEducation.controller.js";
import { auth } from "../../middleWares/auth.middleware.js";
import { DirectEducationRoles } from "./directEducation.endpoints.role.js";
import { mullterMiddleHost } from "../../middleWares/multer.js";
import { allowedExtensions } from "../../utils/allowedExtensions.js";
import expressAsyncHandler from "express-async-handler";

const directEducationRouter = Router()

directEducationRouter.post(
    "/AddDirectEducation/:id",
    auth(DirectEducationRoles.AddDirectEducation),
    mullterMiddleHost({
      extension: allowedExtensions.image,
    }).single("Image"),
    expressAsyncHandler(DirectEducationController.AddDirectEducation)
  );

directEducationRouter.put(
  "/UpdateDirectEducation/:id",
  auth(DirectEducationRoles.updateDirectEducation),
  mullterMiddleHost({
    extension: allowedExtensions.image,
  }).single("Image"),
  expressAsyncHandler(DirectEducationController.UpdateDirectEducation)
);

directEducationRouter.delete("/DeleteDirectEducation/:id",auth(DirectEducationRoles.DeleteDirectEducation),expressAsyncHandler(DirectEducationController.DeleteDirectEducation))

export default directEducationRouter