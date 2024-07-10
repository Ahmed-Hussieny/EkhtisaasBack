import User from "../../../DB/models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateUniqueOtp } from "../../utils/generateUniqueString.js";
import CloudinaryConnection from "../../utils/cloudinary.js";
import Auth from "../../../DB/models/Auth.mode.js";
import sendEmailService from "../../Services/send-email.services.js";
import { verifyEmailBody } from "../../utils/verifyEmailBody.js";
import { otpEmail } from "../../utils/otpEmailBody.js";
import Count from "../../../DB/models/Count.model.js";
import { SendEmailFromHomePage } from "../../utils/SendEmailToAdmin.js";
import { SendEmailToAdminFromContactUs } from "../../utils/SendEmailToAdminFromContactUs.js";

//! =====================================signUp ====================================
export const signUp = async (req, res, next) => {
  const {
    name,
    userName,
    email,
    password,
    EducationalLevel,
    Specialization,
    EmploymentStatus,
    JobTitle,
  } = req.body;

  // & check if Email already exists in the database
  const isUserExistBefore = await Auth.findOne({ email });
  if (isUserExistBefore)
    return res.status(409).json({
      status: 409,
      message: "البريد الإلكتروني موجود بالفعل من قبل",
    });
  // ^ send Email
  const userToken = jwt.sign({ email }, process.env.JWT_SECRET);

  const isEmailsent = await sendEmailService({
    to: email,
    subject: "Email verification",
    message: verifyEmailBody({ name, userToken }),
    //  message:`<h1>Click on the link to verify your email</h1><a href="http://localhost:3000/auth/verify-email?userToken=${userToken}">Verify Email</a>`
  });
  if (!isEmailsent)
    return next(
      new Error("لم يتم إرسال البريد الإلكتروني، يرجى المحاولة مرة أخرى", { cause: 500 })
    );

  // & hash password to create new User
  const hashpassword = bcrypt.hashSync(password, +process.env.SALT_POUNDS);
  // create the user

  const newUser = await Auth.create({
    name,
    userName,
    email,
    password:hashpassword,
    EducationalLevel,
    Specialization,
    EmploymentStatus,
    JobTitle,
  });
  if(!newUser){
    return next(
      new Error("خطأ عند محاولة إضافة مستخدم جديد", { cause: 400 })
    );
  }
  return res.status(201).json({
    status:true,
    message: "تمت إضافة المستخدم بنجاح، تحقق من بريدك الإلكتروني",
  });
};

//! ========================================= Verify Email  ===================================

export const verifyEmail = async (req, res, next) => {
  const { userToken } = req.body;
  const decodedData = jwt.verify(userToken, process.env.JWT_SECRET);
  const updatedUser = await Auth.findOneAndUpdate(
    { email: decodedData.email },
    { Verified: true },
    { new: true }
  );
  if (!updatedUser)
    return res
      .status(500)
      .json({ message: "لم يتم التحقق من البريد الإلكتروني", status: 500 });
  return res.status(200).json({
    status: 200,
    message: "تم التحقق من البريد الإلكتروني بنجاح، يرجى محاولة تسجيل الدخول",
  });
};
//! =========================================singn In ===================================
export const signIn = async (req, res, next) => {
  const { userName, password } = req.body;

  // console.log(req.body);
  // console.log(req);
  const user = await Auth.findOne({ userName });

  // ? if user not exist
  if (!user) {
    return next(new Error(" اسم المستخدم غير صحيح", { cause: 404 }));
  }
  if(!user.Verified){
    return res.status(404).json({
      status: false,
      message: "الحساب غير مفعل لتفعيل الحساب يرجى التحقق من البريد الإلكتروني",
    });
  }

  // * check that password is correct
  const isPasswordMatched = bcrypt.compareSync(password, user.password);
  if (!isPasswordMatched)
    return next(new Error("كلمة مرور خاطئة", { cause: 404 }));

  //& user exist and password valid lets create token

  const Token = jwt.sign(
    { id: user._id, userName: user.userName },
    process.env.ACCESSTOKEN
  );

  // ^ make user online
  const updateStatusOfUser = await Auth.findOneAndUpdate(
    { userName },
    { status: "online" },
    { new: true }
  );

  if (!updateStatusOfUser) {
    return res.status(201).json({
      status: 404,
      message: "Error in updating user status",
    });
  }
  return res.status(200).json({
    status: true,
    message: "user loggedIn successfully",
    userData: updateStatusOfUser,
    Token,
  });
};


// !==================================Forget password ( with sending any email )======================================

// &--------------------------------------------Forget password-------------------------------------------
export const forgetPassword = async (req, res, next) => {
  // take email from body
  const { email } = req.body;
  const user = await Auth.findOne({ email });
  if (!user) {
    return res.status(404).json({
      status:false,
      message: "هذا المستخدم غير صحيح"
    });
  }

  // Generate OTP
  const otp = generateUniqueOtp(6);

  // hash the otp
  const hashedOtp = bcrypt.hashSync(otp, +process.env.SALT_POUNDS,'10m');
  // store the otp in DB with its User id
  const Store_otp = await Auth.findOneAndUpdate({email},{otp:hashedOtp},  { new: true })
  if (!Store_otp) return next(new Error("Error in store the otp"));
  const isEmailsent = await sendEmailService({
    to: email,
    subject: "Otp verification",
    message: otpEmail({ otp }),
  });
  if (!isEmailsent)
    return next(
      new Error("لم يتم إرسال البريد الإلكتروني، يرجى المحاولة مرة أخرى", { cause: 500 })
    );
  return res
    .status(201)
    .json({status:true, message: "تم إنشاء OTP بنجاح، يرجى التحقق من بريدك الإلكتروني", otp, hashedOtp });
};

// &--------------------------------------------Otp Verification --------------------------------------------
export const otpverification= async(req, res, next)=>{
  const {email,otp} = req.body
  const user = await Auth.findOne({email})
  const isPasswordMatched = bcrypt.compareSync(otp, user.otp);
  if(!isPasswordMatched) return res.status(404).json({
    status : false,
    message : "الكود غير صحيح"
  })
  return res.status(200).json({
    status:true,
    message:"الكود صحيح"})
}
// &--------------------------------------------Reset Password --------------------------------------------

export const ResetPassword = async (req, res, next) => {
  const { email, password, ConfirmNewPassword } =req.body;
  const user = await Auth.findOne({email});

  if (!user) {
    return next(new Error("لم يتم العثور على المستخدم", { cause: 404 }));
  }
  if (password === ConfirmNewPassword) {
    // Hash the new password
    const hashResetPassword = await bcrypt.hash(
      password,
      +process.env.SALT_POUNDS
    );

    // Update password
    const updatedUser = await Auth.findOneAndUpdate(
      { email },
      { password: hashResetPassword },
      { new: true }
    );

    if (updatedUser) {
      return res.status(200).json({
        status: true,
        message: "تم إعادة تعيين كلمة المرور بنجاح",
      });
    } else {
      return next(new Error("Error while updating password"));
    }
  } else {
    return next(
      new Error("كلمة المرور الجديدة وتأكيد كلمة المرور ليسا متماثلين")
    );
  }
};

// !============================== Update password ================================
export const UpdatePassword = async (req, res, next) => {
  const { oldPassword, newPassword, confirmNewPassword } = req.body;
  const { _id } = req.authUser;
  let userData = await Auth.findById(_id);
  if (!userData) return next(new Error("User not found", { cause: 404 }));
  // check old password match or not
  const isOldPasswordCorrect = bcrypt.compareSync(
    oldPassword,
    userData.password
  );
  if (!isOldPasswordCorrect)
    return next(new Error("Wrong Old password", { cause: 404 }));

  // check newPassword & confirmNewPassword match or not
  if (newPassword === confirmNewPassword) {
    const hashNewPassword = bcrypt.hashSync(
      newPassword,
      +process.env.SALT_POUNDS
    );
    const updatedUser = await Auth.findByIdAndUpdate(_id, {
      password: hashNewPassword,
    });
    if (updatedUser) {
      return res.status(200).json({
        message: "Password Updated Successfully",
        updatedUser,
      });
    } else {
      return next(new Error("Error in updating the Password"));
    }
  } else {
    return next(
      new Error("The new Password and confirm password are not the same")
    );
  }
};

//! ===========================================Update User====================================

export const UpdateUserData = async (req, res, next) => {
  const { firstName, lastName, email, mobileNumber, profilePic, vehicle } =
    req.body;
  const { _id } = req.authUser;

  // list all error in one object
  const existance = {};

  // check if email exist before
  if (email) {
    const isEmailExist = await Auth.findOne({ email });
    console.log(isEmailExist);

    if (isEmailExist) existance.email = "Email already exists";
  }

  // check if phone exist before
  if (mobileNumber) {
    const isMobileNumberExist = await Auth.findOne({ mobileNumber });
    if (isMobileNumberExist)
      existance.MobileNumberExist = "Phone already exists";
  }

  //  make sure if there dublicated for email or phone
  if (Object.keys(existance).length > 0) {
    return res.status(200).json({
      message: JSON.stringify(existance),
    });
  }

  // update profilePic
  const uploadedFile = req.file;

  if (uploadedFile) {
    const cloudinaryData = await CloudinaryConnection().uploader.upload(
      uploadedFile.path,
      {
        folder: `general/users/${firstName + "_" + lastName}`,
        resource_type: "auto",
        use_filename: true,
        unique_filename: true,
      }
    );

    const updatedUserPic = await Auth.findByIdAndUpdate(
      _id,
      { profilePic: cloudinaryData.secure_url },
      { new: true }
    );
    console.log(updatedUserPic);
    // if (updatedUserPic) {
    //   return res.status(200).json({
    //     message: "User Updated Successfully",
    //     updatedUser,
    //   });
    // }
  }

  // we have no error so lits update the data
  const updatedUser = await Auth.findByIdAndUpdate(
    _id,
    { firstName, lastName, email, mobileNumber, vehicle },
    { new: true }
  );
  if (updatedUser) {
    return res.status(200).json({
      message: "User Updated Successfully",
      updatedUser,
    });
  } else {
    return next(new Error("User not found", { cause: 404 }));
  }
};

//! ===========================================Delete User====================================

export const DeleteUser = async (req, res, next) => {
  // get id after user make a login so he logged in  and he can only delete his account
  const { _id } = req.authUser;

  // Delete account of the logged In user
  const DeletedUser = await Auth.findByIdAndDelete(_id);
  if (DeletedUser) {
    return res.status(200).json({
      message: "User Deleted Successfully",
      DeletedUser,
    });
  } else {
    return next(new Error("Deleted fail", { cause: 404 }));
  }
};

//! ===========================================Delete Specific User====================================

export const DeleteUserById = async (req, res, next) => {
  const { id } = req.params;
  const { role } = req.authUser;

  // Delete account by Id
  const User = await Auth.findOne({ _id: id });
  if (User) {
    if (
      (User.role !== "SuperAdmin" && role === "SuperAdmin") ||
      (User.role !== "Admin" && role === "Admin")
    ) {
      const DeletedUser = await Auth.deleteOne({ _id: id });
      return res.status(200).json({
        message: "User Deleted Successfully",
        DeletedUser,
      });
    }
    return next(
      new Error("You are not allowed to delete this user", { cause: 403 })
    );
  } else {
    return next(new Error("Deleted fail", { cause: 404 }));
  }
};

//!==========================================get User account Data ===================================

export const getUserData = async (req, res, next) => {
  const { _id } = req.authUser;
  const userData = await Auth.findById(
    _id,
    {},
    { projection: { password: 0 } }
  );
  // make sure that user exist
  if (!userData) {
    return next(new Error("User not found", { cause: 404 }));
  }
  return res.status(200).json({
    message: "User Data",
    data: userData,
  });
};

//!========================================== Get profile data for another user  ========================
export const getProfileData = async (req, res, next) => {
  const { userId } = req.params;
  console.log(userId);
  const userProfile = await Auth.findById(
    userId,
    "firstName lastName username email DOB mobileNumber role status -_id"
  );
  // make sure that user exist
  if (!userProfile) {
    return next(new Error("User not found", { cause: 404 }));
  }
  return res.status(200).json({
    message: "another user Data is",
    userProfile,
  });
};



// !=================================================^====================================================

// !===================================Get all accounts associated to a specific recovery Email ===============================
export const GetAllAcountsForRecoveryEmail = async (req, res, next) => {
  const { recoveryEmail } = req.body;

  const users = await User.find({ recoveryEmail }, "-password");
  if (!users.length) {
    return next(new Error("recovery Email not found"));
  }
  return res.status(200).json({
    message: "users associated to this recovery Email",
    users,
  });
};

// & ============= Get All Repair Centers ==============

export const GetAllUsers = async (req, res, next) => {
  const users = await Auth.find({});
  if (!users.length) {
    return next(new Error("No users found"));
  } else {
    return res.status(200).json({
      status: 200,
      success: true,
      message: "All Users",
      data: users,
    });
  }
};


//& ================= counts for Inter ===============
export const CountOfVisitors = async (req, res, next) => {
  try {
    // Find the count document
    let count = await Count.findOne();
    return res.status(200).json({
      status: 200,
      success: true,
      message: "Count of Users",
      data: count
    });
  } catch (error) {
    next(error); // Pass errors to the error handling middleware
  }
};

//& ================= counts for Inter Of single pages ===============
export const CountOfVisitorsForsingle = async (req, res, next) => {
  const  {id} = req.params
  try {
    // Find the count document
    let count = await Count.findOne();

    // If no count document exists, create one with an initial count of 1
    if (!count) {
      count = await Count.create({ 
        countOfVisitors: 0,
        Homepage:0,
        OurServises:0,
        Specialties:0,
        Certificates:0,
        AboutUs:0,
        ContactWithUS:0,
        LinkedIn:"",
        X:"",
        Youtube:"",
        Email:""

       });
    } else {
      // Otherwise, increment the count
      if(id==="0"){
        count.countOfVisitors += 1;
        count.Homepage += 1;
      }
      else if(id==="2"){
        count.OurServises += 1;

      }
      else if(id==="3"){
        count.Specialties += 1;

      }
      else if(id==="4"){
        count.Certificates += 1;

      }
      else if(id==="5"){
        count.AboutUs += 1;

      }
      else if(id==="6"){
        count.ContactWithUS += 1;
      }
      
      await count.save();
    }

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Count of Users",
      data: count
    });
  } catch (error) {
    next(error); // Pass errors to the error handling middleware
  }
};
// & ========================== Send Email from Home Page ================
export const sendEmailFromHomePage = async(req,res,next)=>{
  const {country , educationLevel , fullName,specialization}=req.body
  console.log(country);
  const isEmailsent = await sendEmailService({
    to: "info@ekhtisaas.com",
    subject: "Knowing The Customer",
    message: SendEmailFromHomePage({ country , educationLevel , fullName,specialization }),
  });
  if (!isEmailsent)
    return next(
      new Error("لم يتم إرسال البريد الإلكتروني، يرجى المحاولة مرة أخرى", { cause: 500 })
    );
    return res.status(200).json({
      status: 200,
      success: true,
      message: "تم إرسال البريد الإلكتروني",
    });
}
// & ========================== Send Email from Contact Us Page ================
export const sendEmailFromContactUsPage = async(req,res,next)=>{
  const { name , email , text }=req.body
  const isEmailsent = await sendEmailService({
    to: "info@ekhtisaas.com",
    subject: "From Client",
    message: SendEmailToAdminFromContactUs({ name , email , text }),
  });
  if (!isEmailsent)
    return next(
      new Error("لم يتم إرسال البريد الإلكتروني، يرجى المحاولة مرة أخرى", { cause: 500 })
    );
    return res.status(200).json({
      status: 200,
      success: true,
      message: "تم إرسال البريد الإلكتروني",
    });
}
// & ========================== Put The Web site Information ================
export const PutTheWebsiteInformation = async(req,res,next)=>{
   const { LinkedIn , X , Youtube , Email }=req.body
   let count = await Count.findOne();
   if (!count) {
     count = await Count.create({ 
       countOfVisitors: 0,
       Homepage:0,
       OurServises:0,
       Specialties:0,
       Certificates:0,
       AboutUs:0,
       ContactWithUS:0,
       LinkedIn,
       X,
       Youtube,
       Email
      });
   } 
    if(LinkedIn){
      count.LinkedIn = LinkedIn;
    }
     if(X){
      count.X =X;
    }
     if(Youtube){
      count.Youtube = Youtube;
    }
     if(Email){
      count.Email = Email;
}
     await count.save();
   

   return res.status(200).json({
     status: 200,
     success: true,
     message: "Count of Users",
     data: count
   });
 
}