import { Router } from "express";
import * as SelfEducationController from "./selfEducation.controller.js";
import { SelfEducationRoles } from "./selfEducation.endpoints.roles.js";
import { mullterMiddleHost } from "../../middleWares/multer.js";
import { allowedExtensions } from "../../utils/allowedExtensions.js";
import expressAsyncHandler from "express-async-handler";
import { auth } from "../../middleWares/auth.middleware.js";

const selfEducationRouter = Router()
selfEducationRouter.post(
    "/AddSelfEducation/:id",
    auth(SelfEducationRoles.AddSelfEducation),
    mullterMiddleHost({
      extension: allowedExtensions.image,
    }).single("Image"),
    expressAsyncHandler(SelfEducationController.AddSelfEducation)
  );
  selfEducationRouter.put(
    "/UpdateSelfEducation/:id",
    auth(SelfEducationRoles.updateSelfEducation),
    mullterMiddleHost({
      extension: allowedExtensions.image,
    }).single("Image"),
    expressAsyncHandler(SelfEducationController.UpdateSelfEducation)
  );

selfEducationRouter.delete('/DeleteSelfEducation/:id',auth(SelfEducationRoles.DeleteSelfEducation),expressAsyncHandler(SelfEducationController.DeleteSelfEducation))
export default selfEducationRouter



