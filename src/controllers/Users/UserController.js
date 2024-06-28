const otpModel=require('../../model/Users/OTPModel');
const userModel=require('../../model/Users/UsersModel')

const userCreateService=require('../../services/user/UserCreateService');
const userDetailsService=require('../../services/user/UserDetailsService');
const userLoginService=require('../../services/user/UserLoginService');
const userResetPassService=require('../../services/user/UserResetPassService')
const  userUpdateService=require('../../services/user/UserUpdateService');
const userVerifyEmail=require('../../services/user/UserVerifyEmailService');
const userVerifyOtpService=require('../../services/user/UserVerifyOTPService');

exports.registration=async (req,res)=>{
    const data=await userCreateService(req,userModel);
    res.status(200).json(data);
};

exports.userDetails=async (req,res)=>{
    const data=await userDetailsService(req,userModel);
    res.status(200).json(data);
};

exports.Login=async (req,res)=>{
    const data=await userLoginService(req,userModel);
    res.status(200).json(data);
};

exports.profileUpdate=async (req,res)=>{
    const data=await userUpdateService(req,userModel);
    res.status(200).json(data);
};

exports.recoverVerifyEmail=async (req,res)=>{
    const data=await userVerifyEmail(req,userModel);
    res.status(200).json(data);
};

exports.recoverVeifyOtp=async (req,res)=>{
    const data=await userVerifyOtpService(req,otpModel);
    res.status(200).json(data);
};

exports.resetPassword=async (req,res)=>{
    const data=await userResetPassService(req,userModel);
    res.status(200).json(data);
}

