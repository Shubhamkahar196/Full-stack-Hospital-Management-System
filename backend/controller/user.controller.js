import {catchAsyncError} from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/user.Schema.js";

export const patienRegister = catchAsyncError( async (req,res,next)=>{
    const {firstName, lastName, email, phone, nic, password, gender, dob, role } = req.body;
    if ( !firstName || !lastName || !email || !phone || !nic || !password || !gender || !dob || !role){
        return next(new ErrorHandler("Please fill form", 400));
    }
    const isRegistered = await User.findOne({email});
    if( isRegistered){
        return next(new ErrorHandler("user already registerd!", 400));
    }
   const user = await User.create({ firstName, lastName, email, phone, nic, password, gender, dob, role  });
    res.status(200).json({
        success: true,
        message: "user registered",
    })
})

export const login = catchAsyncError(async(req,res,next)=>{
    const {email,password,confirmPassword, role} = req.body;
    if( !email || !password || !confirmPassword || !role){
        return next(new ErrorHandler("Please provide all details", 400));
    }
    if(password !== confirmPassword){
        return next(new ErrorHandler("Password not matched ", 400));
    }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid password or email", 400));   
    }

    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid password or email", 400)); 
    }
    if(role !== user.role){
        return next(new ErrorHandler("User with this role not found", 400)); 
    }
    res.status(200).json({
        success: true,
        message: "User Logged in successfully"
    })
})