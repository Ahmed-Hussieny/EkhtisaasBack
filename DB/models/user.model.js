import { Schema, model } from "mongoose";

const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "Please provide your First Name"],
        lowercase: true
    },
    lastName: {
        type: String,
        required: [true, "Please provide your Last Name"],
        lowercase: true
    },
    username: {
        type: String,
        lowercase: true
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please provide your Email"]
    },
    password: {
        type: String,
        required: [true, "Please provide your Password"]
    },
    recoveryEmail: {
        type: String,
        default: ""
    },
    DOB: {
        type: Date,
        required: true,
    },
    mobileNumber: {
        type: String,
        unique: true,
    },
    role: {
        type: String,
        default: 'User',
        enum: ['User', 'Technician', 'Admin', 'SuperAdmin'],

    },
    status: {
        type: String,
        default: 'offline',
        enum: ['online', 'offline']
    }
}, {
    timestamps: true
})


const User = model('user', userSchema);
export default User