const mongoose=require('mongoose');


const DetailsByIdService=async (req,DataModel)=>{
   try{
       const userEmail=req.headers['email'];
       const objectID=mongoose.Types.ObjectId;
       const id=new objectID(req.params.Id);
       const query={userEmail:userEmail,_id:id};
       const data=await DataModel.aggregate([
           {$match:query}
       ]);
        return {status:"success",data:data}
   }catch (e) {
       return {status:'fail',data:e.toString()};
   }
}

module.exports=DetailsByIdService;