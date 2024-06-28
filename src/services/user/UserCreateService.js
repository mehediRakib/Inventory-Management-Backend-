const UserCreateService=async (req,DataModel)=>{
    try{
        let postBody=req.body;
        let data=await DataModel.create(postBody);
        return {status:"success",data:data};


    }catch(e)
    {
        return {status:"fail",data:e.toString()};
    }
}

module.exports=UserCreateService;