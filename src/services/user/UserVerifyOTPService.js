const UserVerifyOTPService=async (req,DataModel)=>{
    try{
        let email=req.params.email;
        let otp=req.params.otp;
        let status=0;
        let statusUpdate=1;

        let OtpCount=(await DataModel.aggregate([{$match:{email:email,otp:otp,status:status}},{$count:"total"}]));

        if(OtpCount.length>0){
            let OtpUpdate=await DataModel.updateOne({email:email,otp:otp,status:status},{otp:otp,email:email,status:statusUpdate})
            return {status:"success",data:OtpUpdate};
        }
        else {
            return {status:"fail",data:"Invalid Otp code"};
        }
    }catch (e) {
        return {status:"fail",data:e.toString()};
    }
}

module.exports=UserVerifyOTPService;