import { catchAsyncError } from "./catchAsyncError.js";
import ErrorHandler from "./errorMiddleware.js";
import jwt from 'jsonwebtoken';

// admin authenticated
export const isAdminAuthenticated = catchAsyncError(
    async (req, res, next) => {
      const token = req.cookies.adminToken;
      if (!token) {
        return next(
          new ErrorHandler("Admin is not authenticated!", 400)
        );
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = await User.findById(decoded.id);
      if (req.user.role !== "Admin") {
        return next(
          new ErrorHandler(`${req.user.role} not authorized for this resource!`, 403)
        );
      }
      next();
    }
  );

//user or pateint authenticated
export const isPatientAuthenticated = catchAsyncError(async(req,res,next)=>{
    const token = req.cookies.patientToken;
    if(!token){
        return next (new ErrorHandler("Patient not authenticated", 400));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    if(req.user.role !== "Patient"){
        return next(
            new ErrorHandler(
                `${req.user.role} not authorized for this resources!`, 403 
            )
        )
    }
    next();
})