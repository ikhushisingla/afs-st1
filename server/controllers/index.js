const User = require("../models/user");
const Otp=require('../models/otp');
const { sendError, generateOTP } = require("../utils/helper");

const signup=async(req,res)=>{
    try{
        const {name,password,email}=req.body;
        const oldUser = await User.findOne({ email });
        if (oldUser) return sendError(res, "This email is already in use!");
        const newUser = new User({ name, email, password });
        await newUser.save();
        let token = generateOTP();
        // store otp inside our db
        const verfiyOTP = new Otp({
          email: newUser.email,
          token: token,
        });
        await verfiyOTP.save();
        res.status(201).json({
            user: {
              id: newUser._id,
              name: newUser.name,
              email: newUser.email,
              isVerified:newUser.isVerified
            },
          });
    }catch(err){
        console.error("🚫"+err);
        res.status(500).json({error:err.message || err});
    }
}
const login=async(req,res)=>{
    try{
        const {password,email}=req.body;
        const user = await User.findOne({ email });

        if (!user) return sendError(res, "User doesnot exist");
        const matched=await user.comparePassword(password)
        if(!matched) return sendError(res,"Password doesnot match")
        res.status(201).json({
            user: {
              id: user._id,
              name: user.name,
              email: user.email,
              isVerified:user.isVerified

            },
          });
    }catch(err){
        console.error("🚫"+err);
        res.status(500).json({error:err.message || err});
    }
}
const verify=async(req,res)=>{
    try{
        const { email, otp } = req.body;
      
        const user = await User.findOne({email});
        if (!user) return sendError(res, "user not found!", 404);
      
        if (user.isVerified) return sendError(res, "user is already verified!");
      
        const token = await Otp.findOne({ email });
        if (!token) return sendError(res, "token not found!");
      
        const isMatched = token.token==otp;
        if (!isMatched) return sendError(res, "Please submit a valid OTP!");
      
        user.isVerified = true;
        await user.save();
      
        await Otp.findByIdAndDelete(token._id);      
      
        res.status(201).json({
            user: {
              id: user._id,
              name: user.name,
              email: user.email,
              isVerified:user.isVerified
            },
          });
    }catch(err){
        console.error("🚫"+err);
        res.status(500).json({error:err.message || err});
    }
}

const resendOtp=async(req,res)=>{
  try{
    const {email}=req.body

    const checkOtp=await Otp.findOne({email})
    if(checkOtp) return sendError(res, "Email with otp has already been sent to user");
    
    let token = generateOTP();
        // store otp inside our db
        const verfiyOTP = new Otp({
          email:email,
          token: token,
        });
        await verfiyOTP.save();
        console.log('otp generated')
        res.status(201).json({message:' Otp sent'});
  }
  catch(err){
    console.error("🚫"+err);
    res.status(500).json({error:err.message || err});
  }
}
module.exports={signup,login,verify,resendOtp};