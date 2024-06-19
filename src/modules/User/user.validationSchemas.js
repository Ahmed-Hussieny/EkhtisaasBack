import Joi from 'joi';
const isoDateSchema = Joi.date().iso(); 

const customDateFormatRegex = /^(?:19|20)\d\d[-_](0[1-9]|1[0-2])[-_](0[1-9]|[12][0-9]|3[01])$/;
import { objectIdvalidation } from '../../utils/ObjectIdValidation.js';

const customDateFormatSchema = Joi.string().regex(customDateFormatRegex).message('Invalid date format. Use YYYY_MM_DD.');


// !=================validation for sign Up schema===========================

export const SignUpSchema = {

  body: Joi.object({
    name: Joi.string().min(4).required(),
    userName: Joi.string().min(4).required(),
    email: Joi.string().email({ tlds: { allow: ['com', 'org', 'yahoo'] }, minDomainSegments: 2 }).required(),
    /*
        & At least one lowercase letter
        & At least one uppercase letter
        & At least one digit
        & At least one special character (in the set !@#$%^&*)
        & Minimum length of 8 characters
    */
    password: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})')).required(),
    EducationalLevel: Joi.string(),
    Specialization: Joi.string(),
    EmploymentStatus: Joi.string(),
    role: Joi.string().valid('User','Admin'),
    status: Joi.string().valid('online', 'offline'),
    JobTitle: Joi.string()
  }),
};

// !=================validation for sign In schema===========================
export const SignInSchema = {

  body: Joi.object({
    userName: Joi.string(),
    /*
        & At least one lowercase letter
        & At least one uppercase letter
        & At least one digit
        & At least one special character (in the set !@#$%^&*)
        & Minimum length of 8 characters
    */
    password: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})')).required(),
  })
};


// !=================validation for Update user In schema===========================

export const UpdateSchema = {

  body: Joi.object({
    firstName: Joi.string().min(4),
    lastName: Joi.string().min(4),
    email: Joi.string().email({ tlds: { allow: ['com', 'org', 'yahoo'] }, minDomainSegments: 2 }),
    status: Joi.string(),
    mobileNumber: Joi.string().pattern(new RegExp('^(?:\\+20|0)?1[0-2]\\d{8}$')).message("Enter valid Phone number"),
  }),
};



// !=================validatioon for get user Data from another account schema===========================


export const GetProfileSchema = {

  params:Joi.object({
    userId:Joi.string().custom(objectIdvalidation).required()
  })
};

// !=================validatioon for Update password schema===========================

export const UpdatePasswordSchema = {

  body: Joi.object({
     /*
        & At least one lowercase letter
        & At least one uppercase letter
        & At least one digit
        & At least one special character (in the set !@#$%^&*)
        & Minimum length of 8 characters
    */
        oldPassword: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})')).message(`"oldPassword" At least one lowercase letter &  At least one uppercase letter & At least one digit & 
        & At least one special character (in the set !@#$%^&*) & Minimum length of 8 characters`).required(),

        newPassword: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})')).message(`"newPassword" At least one lowercase letter &  At least one uppercase letter & At least one digit & 
        & At least one special character (in the set !@#$%^&*) & Minimum length of 8 characters`).required(),

        confirmNewPassword: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})')).message(`"confirmNewPassword" At least one lowercase letter &  At least one uppercase letter & At least one digit & 
        & At least one special character (in the set !@#$%^&*) & Minimum length of 8 characters`).required(),


  }),
};
