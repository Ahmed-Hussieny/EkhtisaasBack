import { Schema, model } from "mongoose";

const SubSpecialtySchema = new Schema({
    Title:{
        type:String,
        required:true,
        unique:true
    },
    MainTitle:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    Image: {
        secure_url: { type: String, required: true },
        public_id: { type: String, required: true, unique: true }
    },
    MainSpecialtyId:{
        type:Schema.Types.ObjectId,
        ref:'MainSpecialty',
        required:true
    }
},{
    timestamps:true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

SubSpecialtySchema.virtual('Certificates',{
    ref:'Certificate',
    localField:'_id',
    foreignField:'SubSpecialtyId',
})
const SubSpecialty = model('SubSpecialty',SubSpecialtySchema)
export default SubSpecialty