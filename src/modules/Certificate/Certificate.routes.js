import { Router } from "express";
import { auth } from '../../middleWares/auth.middleware.js';
import { CertificateRoles } from "./Certificate.endpoints.role.js";
import expressAsyncHandler from "express-async-handler";
import * as CertificateController from "./Certificate.controller.js";
import { mullterMiddleHost } from "../../middleWares/multer.js";
import { allowedExtensions } from "../../utils/allowedExtensions.js";

const CertificateRouter = Router()

CertificateRouter.post("/AddCertificate",auth(CertificateRoles.AddCertificate),mullterMiddleHost({ extensions: allowedExtensions.image }).fields([
    { name: 'certificateImage', maxCount: 1 },
    { name: 'organizationImage', maxCount: 1 },
]),expressAsyncHandler(CertificateController.AddCertificate))

CertificateRouter.get("/GetAllCertificates",auth(CertificateRoles.GetCertificate),expressAsyncHandler(CertificateController.GetAllCertificates))
CertificateRouter.get("/GetSinglecertificate/:id",auth(CertificateRoles.GetCertificate),expressAsyncHandler(CertificateController.GetSinglecertificate))

CertificateRouter.put("/UpdateCertificate/:id",auth(CertificateRoles.updateCertificate),mullterMiddleHost({ extensions: allowedExtensions.image }).fields([
    { name: 'certificateImage', maxCount: 1 },
    { name: 'organizationImage', maxCount: 1 },
]),expressAsyncHandler(CertificateController.UpdateCertificate))

CertificateRouter.delete("/DeleteCertificate/:id",auth(CertificateRoles.DeleteCertificate),expressAsyncHandler(CertificateController.DeleteCertificate))
export default CertificateRouter