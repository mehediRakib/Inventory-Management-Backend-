 const OTPModel=require('../../model/Users/OTPModel');

const SentEmail=require('../../utility/sentEmail');
const UserVerifyEmailService=async (req,DataModel)=>{
   try{
       let email=req.params.email;
       let otp=Math.floor(100000+Math.random()*900000)
       const user=(await DataModel.aggregate([{$match:{email:email}},({$count:"total"})]))
       if(user.length>0){
           await OTPModel.create({email:email,otp:otp});
           let sendEmail=await SentEmail(email,"Inventory Management System PIN verification", `Your PIN code is : ${otp}`);
           return  {status:"success",otp:otp,data:sendEmail};
       }
       else
       {
           return {status:"fail",data:"No User Found"}
       }
   }catch (e) {
       return {status:"fail",data:e.toString()};
   }
}

module.exports=UserVerifyEmailService;