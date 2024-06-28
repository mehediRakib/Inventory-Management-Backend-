const mongoose = require("mongoose");
const ObjectID=mongoose.Types.ObjectId
const UpdateService=async (req,DataModel)=>{
   try{
       let email=req.headers['email'];
       let postBody=req.body;
       const id=new ObjectID(req.params.Id);
       let data=await DataModel.updateOne({_id:id ,userEmail:email},postBody);
       return {status:"success",data:data};
   }catch (e) {
       return  {status:"fail",data:e.toString()};
   }
}

module.exports=UpdateService;