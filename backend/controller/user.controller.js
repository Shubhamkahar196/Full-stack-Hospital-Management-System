import {catchAsyncError} from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/user.Schema.js";

export const patienRegister = catchAsyncError( async (req,res,next)=>{
    const {firstName, lastName, email, phone, nic, password, gender, dob, role } = req.body;
    if ( !firstName || !lastName || !email || !phone || !nic || !password || !gender || !dob || !role){
        return next(new ErrorHandler("Please fill form", 400));
    }
    const user = await User.findOne({email});
    if(user){
        return next(new ErrorHandler("user already registerd!", 400));
    }
    user = await User.create({ firstName, lastName, email, phone, nic, password, gender, dob, role  });
    res.status(200).json({
        succes: true,
        message: "user registered",
    })
})