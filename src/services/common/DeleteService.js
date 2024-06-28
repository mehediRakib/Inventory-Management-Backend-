
const DeleteService=async (req,DataModel)=>{
 try{
     const id=req.params.Id;
     const userEmail=req.headers['email'];
     const data=await DataModel.deleteOne({_id:id,userEmail:userEmail});
     return {status:'success',data:data};
 }catch (e) {
     return {status:'fail',data:e}
 }
}

module.exports=DeleteService;