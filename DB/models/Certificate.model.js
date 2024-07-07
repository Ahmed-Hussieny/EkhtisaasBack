import { Schema, model } from "mongoose";

const certificateSchema = new Schema({
    //^Main information
    certificateImage: {
        secure_url: { type: String, required: true },
        public_id: { type: String, required: true, }
    },
    certificateName:{
        type:String,
        required:true,
        unique:true
    },
    organizationImage: {
        secure_url: { type: String, required: true },
        public_id: { type: String, required: true}
    },
    Level:{
        type:String,
        required:true,
    },
    organizationName:{
        type:String,
        required:true,
    },
    Description:{
        type:String,
        required:true,
    },
    //^ inner information
    Specialties: {
        type: String,
        required:true
    },
    JobTitle:{
        type:String,
        required:true,
    },
    Prerequisites:{
        type: String,
        required:true
    },
    scientificMethods:{
        type: String,
        required:true
    },
    SupportedLanguages:{
        type: String,
        required:true,
    },
    NumberOfTests:{
        type:Number,
        required:true,
    },
    CertificateValidityPeriod:{
        type:Number,
        required:true,
    },
    trainingCost:{
        type:Number,
        required:true,
    },
    testCost:{
        type:Number,
        required:true,
    },
    totalCost:{
        type:Number,
        required:true,
    },
    SubSpecialtyId:{
        type:Schema.Types.ObjectId,
        ref:'SubSpecialty',
        required:true
    }
},{
    timestamps:true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})
certificateSchema.virtual('directEducations',{
    ref:'directEducation',
    localField:'_id',
    foreignField:'CertificateId',
})

certificateSchema.virtual('selfEducations',{
    ref:'selfEducation',
    localField:'_id',
    foreignField:'CertificateId',
})
certificateSchema.virtual('supportSides',{
    ref:'supportSide',
    localField:'_id',
    foreignField:'CertificateId',
})
const Certificate = model('Certificate',certificateSchema)
export default Certificate