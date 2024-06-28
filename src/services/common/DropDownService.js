
const DropDownService=async (req,DataModel,Projection)=>{
    try{
        const email=req.headers['email'];
        let data=await DataModel.aggregate([
            {$match:{userEmail:email}},
            {$project:Projection}
        ])
        return {status:"success",data:data}
    }catch (e) {
        return {status:"fail",data:e.toString()};
    }
}

module.exports=DropDownService;