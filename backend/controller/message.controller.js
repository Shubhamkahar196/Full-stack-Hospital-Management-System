import { Message } from "../models/message.Schema.js";


export const sendMessage = (async(req,res,next)=>{
    const {firstName, lastName , email, phone, message } = req.body;
    if(!firstName || !lastName || !email || !phone || !message){
        // return next(new ErrorHandler("Please fill full form !", 400));
        res.status(400).json({
            success: false,
            message: "Please fill full form",
        });
    }

    await Message.create({ firstName, lastName , email, phone, message });
    res.status(200).json({
        success: true,
        message: "Message sent successfully!",
    });
});

export const getAllMessage = (async(req,res,next)=>{
    const message = await Message.find();
    res.status(200).json({
        success: true,
        message,
    });
});