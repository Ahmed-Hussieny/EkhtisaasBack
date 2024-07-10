import { Schema, model } from "mongoose";

const CountSchema = new Schema({
    countOfVisitors:{
        type: Number,
    },
    Homepage:{
        type: Number,
    },
    OurServises:{
        type: Number,
    },
    Specialties:{
        type: Number,
    },
    Certificates:{
        type: Number,
    },
    AboutUs:{
        type: Number,
    },
    ContactWithUS:{
        type: Number,
    },
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


const Count = model('Count', CountSchema);
export default Count