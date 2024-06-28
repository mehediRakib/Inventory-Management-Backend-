const createToken=require('../../utility/createToken');
const UserLoginService=async (req,DataModel)=>{
   try{
       const postBody=req.body;
       const data=await DataModel.aggregate([{$match:postBody},{$project:{_id:0,email:1,firstName:1,lastName:1,mobile:1,photo:1}}]);
       if(data.length>0){
           const token=await createToken(data[0]['email']);
           console.log(token)
           return {status:'success',data:data[0],token:token};
       }else { return  {status:"unauthorized"}}
   }catch (e) {
       return {status:"fail",data:e.toString()};
   }
}

module.exports=UserLoginService;