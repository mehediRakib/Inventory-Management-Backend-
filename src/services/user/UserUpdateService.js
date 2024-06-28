const userUpdateService=async (req,DataModel)=>{
    try{
        let data=await DataModel.updateOne({email:req.headers['email']},req.body);
        return  {status:"success",data:data};
    }catch (e) {
        return {status:"fail",data:e.toString()};
    }
}

module.exports=userUpdateService;