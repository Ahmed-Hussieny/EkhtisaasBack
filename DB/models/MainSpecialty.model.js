import { Schema, model } from "mongoose";

const MainSpecialtySchema = new Schema({
    Title:{
        type:String,
        required:true,
        unique: true,
    },
    Type:{
        type:String,
        required:true,
    },
    Description:{
        type:String,
        required:true,
    },
    Image: {
        secure_url: { type: String, required: true },
        public_id: { type: String, required: true, unique: true }
    },
},{
    timestamps:true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

MainSpecialtySchema.virtual('SubSpecialtyies',{
    ref:'SubSpecialty',
    localField:'_id',
    foreignField:'MainSpecialtyId',
})
const MainSpecialty = model('MainSpecialty',MainSpecialtySchema)
export default MainSpecialty;