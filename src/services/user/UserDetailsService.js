const UserDetailsService=async (req,DataModel)=>{
 try{
     let email=req.headers['email'];
     const data=await DataModel.aggregate([{$match:{email:email}}]);
     return {status:"success",data:data};
 }catch (e) {
     return {status:"fail",data:e.toString()};
 }

}

module.exports=UserDetailsService;