import { Router } from "express";
import * as AdvisorController from './Advisor.controller.js';
import { mullterMiddleHost } from "../../middleWares/multer.js";
import { AdvisorRoles } from "./Advisor.endpoint.roles.js";
import { allowedExtensions } from "../../utils/allowedExtensions.js";
import expressAsyncHandler from "express-async-handler";
import { auth } from "../../middleWares/auth.middleware.js";

const AdvisorRouter = Router()


AdvisorRouter.post(
    "/AddAdvisor",
    auth(AdvisorRoles.AddAdvisor),
    mullterMiddleHost({
      extension: allowedExtensions.image,
    }).single("Image"),
    expressAsyncHandler(AdvisorController.AddAdvisor)
  );


  AdvisorRouter.put(
    "/updateAdvisor/:id",
    auth(AdvisorRoles.updateAdvisor),
    mullterMiddleHost({
      extension: allowedExtensions.image,
    }).single("Image"),
    expressAsyncHandler(AdvisorController.updateAdvisor)
  );


AdvisorRouter.delete('/deleteAdvisor/:id',auth(AdvisorRoles.DeleteAdvisor), expressAsyncHandler(AdvisorController.DeleteAdvisor))
AdvisorRouter.get('/GetAllAdvisors',auth(AdvisorRoles.GetAdvisor), expressAsyncHandler(AdvisorController.GetAllAdvisors))

AdvisorRouter.get('/GetSingleAdvisor/:id',auth(AdvisorRoles.GetAdvisor), expressAsyncHandler(AdvisorController.GetSingleAdvisor))

export default AdvisorRouter