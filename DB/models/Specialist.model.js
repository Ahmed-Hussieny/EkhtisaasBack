import { Schema, model } from "mongoose";

const SpecialistSchema = new Schema({
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

    Services:{
        type:String,
        required:true,
    },
    Category:{
        type:String,
        required:true,
    },
    PriceOfServices:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        
        unique:true
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

const Specialist = model('Specialist',SpecialistSchema)
export default Specialist