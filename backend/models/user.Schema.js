import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, "First Name must contain at least 3 characters!"],
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, "Last Name must contain at least 3 characters!"],
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Provide a valid email"],
    },
    phone:{
        type: String,
        required: true,
        minLength: [10, "Phone Number Must Contain Exact 10 Digits!"],
        maxLength: [10, "Phone Number Must Contain Exact 10 Digits!"],
    },
    // "NIC" likely refers to NIC (National Identification Number)
    nic:{
        type:String,
        required: true,
        minLength: [10, "NIC Must Contain Exact 10 Digits!"],
        maxLength: [10, "NIC Must Contain Exact 10 Digits!"],
    },
    dob: {
        type: Date,
        required: [true, "DOB is required!"],
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female", "Other"],
    },
    password: {
        type: String,
        required: true,
        minLength: [8, "Password must contain at least 8 charcters!"],
        select: false
    },
    role:{
        type: String,
        required: true,
        enum: ["Admin", "Patient", "Doctor"],
    },
    doctorDepartment:{
        type: String
    },
    docAvatar: {
        public_id: String,
        url: String,
    }

});

export const User = mongoose.model("User", userSchema);