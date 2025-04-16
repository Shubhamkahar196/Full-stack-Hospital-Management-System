import {catchAsyncError} from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/user.Schema.js";
import { generateToken } from "../utils/jwtToken.js"
import cloudinary from 'cloudinary'


//patient register
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
   generateToken(user,"User registerd!", 200,res);
    // res.status(200).json({
    //     success: true,
    //     message: "user registered",
    // })
})

//patient login
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
    generateToken(user,"User Login Seccessfully", 200,res);
    // res.status(200).json({
    //     success: true,
    //     message: "User Logged in successfully"
    // })
})

// adding new Admin

export const addNewAdmin = catchAsyncError(async (req, res, next) => {
    const { firstName, lastName, email, phone, nic, dob, gender, password } =
      req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !nic ||
      !dob ||
      !gender ||
      !password
    ) {
      return next(new ErrorHandler("Please Fill Full Form!", 400));
    }
  
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
      return next(new ErrorHandler("Admin With This Email Already Exists!", 400));
    }
  
    const admin = await User.create({
      firstName,
      lastName,
      email,
      phone,
      nic,
      dob,
      gender,
      password,
      role: "Admin",
    });
    generateToken(admin, "New Admin Registered", 200, res);

    // res.status(200).json({
    //   success: true,
    //   message: "New Admin Registered",
    //   admin,
    // });
  });


  export const getAllDoctors = catchAsyncError(async(req,res,next)=>{
    const doctors = await User.find({role: "Doctor"});
    res.status(200).json({
        success: true,
        doctors,
    });
  })

  export const getUserDetails = catchAsyncError(async (req, res, next) => {
    const user = req.user;
    res.status(200).json({
      success: true,
      user,
    });
  });

  

  export const logoutAdmin = catchAsyncError(async(req,res,next)=>{
    res.status(200).cookie("adminToken", "",{
      httpOnly: true,
      expires: new Date(Date.now()),
    }).json({
      success: true,
      message: "Admin Log out successfully!"
    })
  });

  export const logoutPatient = catchAsyncError(async(req,res,next)=>{
    res.status(200).cookie("patientToken", "",{
      httpOnly: true,
      expires: new Date(Date.now()),
    }).json({
      success: true,
      message: "Patient Log out successfully!"
    })
  });

  export const addNewDoctor = catchAsyncError(async(req,res,next)=>{
    if(!req.files || Object.keys(req.files).length==0){
      return next(new ErrorHandler("Doctor Avatar Required!", 400));
    }
    const {docAvatar} = req.files;
    const allowedFormats = ["/image/png","/image/jpeg", "/image/webp"];
    if(!allowedFormats.includes(docAvatar.mimetype)){
      return next(new ErrorHandler("File Format Not Supported!",400));
    }

    const {
      firstName, lastName, email, phone, nic, password, gender, dob, role ,doctorDepartment
    } = req.body;
      
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !nic ||
      !dob ||
      !gender ||
      !password ||
      !doctorDepartment
    ){
      return next(new ErrorHandler("Please Provide full details!", 400));
    }
    const isRegistered = await User.findOne({email});
    if(!isRegistered){
      return next(new ErrorHandler(`${isRegistered.role} already registered with this email`, 400));
    }
    const cloudinaryResponse = await cloudinary.UploadStream.upload(
      docAvatar.tempFilePath
    );
    if(!cloudinaryResponse || cloudinaryResponse.error){
      console.error(
        "Cloudinary Error: ",
        cloudinaryResponse.error || "unknown Cloudinary Error"
      );
    }

    const doctor = await User.create({
      firstName, lastName, email, phone, nic, password, gender, dob, role ,doctorDepartment, role:"Doctor",
      docAvatar:{
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
    });
    res.status(200).json({
      success: true,
      message: "New Doctor Registered !",
      doctor
    });
  });