import { Schema, model } from "mongoose";

const selfEducationSchema = new Schema({
    selfEducationTitle:{type: String, required: true },
    selfEducationURL:{type: String, required: true },
    Image:{
            secure_url: { type: String, required: true },
            public_id: { type: String, required: true, unique: true }
        }
    ,CertificateId:{
        type:Schema.Types.ObjectId,
        ref:'Certificate',
        required:true
    }
},{
    timestamps:true,
})
const SelfEducation = model('selfEducation',selfEducationSchema)
export default SelfEducation