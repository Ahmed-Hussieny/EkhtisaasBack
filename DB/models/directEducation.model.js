import { Schema, model } from "mongoose";

const directEducationSchema = new Schema({
    directEducationTitle:{type: String, required: true },
    directEducationURL:{type: String },
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
const DirectEducation = model('directEducation',directEducationSchema)
export default DirectEducation