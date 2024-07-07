import { Router } from "express";
import * as supportSideController from "./supportSide.controller.js";
import { auth } from "../../middleWares/auth.middleware.js";
import { mullterMiddleHost } from "../../middleWares/multer.js";
import { allowedExtensions } from "../../utils/allowedExtensions.js";
import expressAsyncHandler from "express-async-handler";
import { SupportSideRoles } from "./supportSide.endpoints.roles.js";

const supportSideRouter = Router()

supportSideRouter.post(
    "/AddSupportSide/:id",
    auth(SupportSideRoles.AddsupportSide),
    mullterMiddleHost({
      extension: allowedExtensions.image,
    }).single("Image"),
    expressAsyncHandler(supportSideController.AddSupportSide)
  );

  supportSideRouter.put(
    "/UpdateSupportSide/:id",
    auth(SupportSideRoles.updatesupportSide),
    mullterMiddleHost({
      extension: allowedExtensions.image,
    }).single("Image"),
    expressAsyncHandler(supportSideController.UpdateSupportSide)
  );
  
supportSideRouter.delete('/DeleteSupportSide/:id',auth(SupportSideRoles.DeletesupportSide), expressAsyncHandler(supportSideController.DeleteSupportSide))

export default supportSideRouter