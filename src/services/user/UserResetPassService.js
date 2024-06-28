const OtpModel=require('../../model/Users/OTPModel')
const UserResetPassService=async (req,DataMode)=>{
    try{
        let statusUpdate=1;
        let email=req.body['email'];
        let otpCode=req.body['otp'];
        let newPass=req.body['password'];

        let OtpVerifyCheck=await OtpModel.aggregate([{$match:{email:email,otp:otpCode,status:statusUpdate}},{$count:'total'}])

        if(OtpVerifyCheck.length>0){
            let PassUpdate=await DataMode.updateOne({email:email},{password:newPass});
            return {status:'success',data:PassUpdate};
        }else {
            return  {status:'fail',data:"Invalid Request"};
        }
    }catch (e) {
        return {status:"fail",data:e.toString()}
    }
}

module.exports=UserResetPassService;