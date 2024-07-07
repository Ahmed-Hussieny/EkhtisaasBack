import { Schema, model } from "mongoose";

const supportSideSchema = new Schema({
    supportSideTitle:{type: String, required: true },
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
const SupportSide = model('supportSide',supportSideSchema)
export default SupportSide