import { Router } from "express";
import * as UserController from "./user.controller.js";
import { validationMiddleware } from "../../middleWares/validationMiddleware.js";

import {
  GetProfileSchema,
  SignInSchema,
  SignUpSchema,
  UpdatePasswordSchema,
  UpdateSchema,
} from "./user.validationSchemas.js";
import expressAsyncHandler from "express-async-handler";
import { auth } from "../../middleWares/auth.middleware.js";
import { mullterMiddleHost } from "../../middleWares/multer.js";
import { allowedExtensions } from "../../utils/allowedExtensions.js";
import { endpointsRoles } from "./user.endpoints.roles.js";

const UserRoute = Router();

UserRoute.post(
  "/signUp",
  validationMiddleware(SignUpSchema),
  expressAsyncHandler(UserController.signUp)
);
UserRoute.post(
  "/signIn",
  validationMiddleware(SignInSchema),
  expressAsyncHandler(UserController.signIn)
);
UserRoute.post("/verifyEmail", expressAsyncHandler(UserController.verifyEmail));
UserRoute.post('/forgetPassword',expressAsyncHandler(UserController.forgetPassword));
UserRoute.post('/otpverification',expressAsyncHandler(UserController.otpverification))
UserRoute.post('/ResetPassword',expressAsyncHandler(UserController.ResetPassword))
UserRoute.put(
  "/UpdateUserData",
  auth(endpointsRoles.UPDATEUSER),
  mullterMiddleHost({
    extension: allowedExtensions.image,
  }).single("image"),
  validationMiddleware(UpdateSchema),
  expressAsyncHandler(UserController.UpdateUserData)
);
UserRoute.delete(
  "/DeleteUser",
  auth(endpointsRoles.DELETEUSER),
  expressAsyncHandler(UserController.DeleteUser)
);
UserRoute.delete(
  "/DeleteUserById/:id",
  auth(endpointsRoles.DELETEUSERBYID),
  expressAsyncHandler(UserController.DeleteUserById)
);
UserRoute.get(
  "/getUserData",
  auth(endpointsRoles.GETUSERDATA),
  expressAsyncHandler(UserController.getUserData)
);
UserRoute.get(
  "/getProfileData/:userId",
  validationMiddleware(GetProfileSchema),
  expressAsyncHandler(UserController.getProfileData)
);
UserRoute.put(
  "/UpdatePassword",
  auth(endpointsRoles.UPDATEPASSWORD),
  validationMiddleware(UpdatePasswordSchema),
  expressAsyncHandler(UserController.UpdatePassword)
);
UserRoute.get(
  "/GetAllUsers",
  auth(endpointsRoles.GETALLUSERS),
  expressAsyncHandler(UserController.GetAllUsers)
);

UserRoute.get(
  "/CountOfVisitors",
  // auth(endpointsRoles.GETALLUSERS),
  expressAsyncHandler(UserController.CountOfVisitors)
);
UserRoute.get(
  "/CountOfVisitorsForsingle/:id",
  // auth(endpointsRoles.GETALLUSERS),
  expressAsyncHandler(UserController.CountOfVisitorsForsingle)
);
UserRoute.post(
  "/sendEmailFromHomePage",
  expressAsyncHandler(UserController.sendEmailFromHomePage)
);
UserRoute.post(
  "/sendEmailFromContactUsPage",
  expressAsyncHandler(UserController.sendEmailFromContactUsPage)
);

UserRoute.post(
  "/PutTheWebsiteInformation",
  expressAsyncHandler(UserController.PutTheWebsiteInformation)
);




export default UserRoute;
