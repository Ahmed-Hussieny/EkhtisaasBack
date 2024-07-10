import { Schema, model } from "mongoose";

const AdvisorSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    Image:{
        secure_url: { type: String, required: true },
        public_id: { type: String, required: true, }
    },
    Description:{
        type:String,
        required:true,
    },
    ExperienceInYears:{
        type:String,
        required:true,
    },
    experienceDescription:{
        type:String,
        required:true,
    },
    contentcareer:{
        type:String,
        required:true,
    },
    PriceOfCareerCounselingSession:{
        type:String,
        required:true,
    },
    email:{
        type:String,
       
    },
    linkedIn:{
        type:String,
       
    },
    X:{
        type:String,
       
    },
    website:{
        type:String,
       
    },
    Rate:{
        type:Number,
    }

},{
    timestamps:true
})

const Advisor = model('Advisor',AdvisorSchema)
export default Advisor