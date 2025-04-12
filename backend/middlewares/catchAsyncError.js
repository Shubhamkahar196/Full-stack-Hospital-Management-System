
export const catchAsyncError = (e) =>{
    return(req,res,next) =>{
        Promise.resolve(e(req,res,next)).catch(next);
    };
};