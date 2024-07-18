import { Schema, model } from "mongoose";

const ContactSchema = new Schema({
    LinkedIn:{
        type:String
    },
    X:{
        type:String
    },
    Youtube:{
        type:String
    },
    Email:{
        type:String
    }
}, {
    timestamps: true
})


const Contact = model('Contact', ContactSchema);
export default Contact