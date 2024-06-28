let mongoose=require('mongoose');

const DeleteParentChildService=async (req,DataModel1,DataModel2,JointProperty)=>{
    const session=await mongoose.startSession();

    try{
        await session.startTransaction();
        let DeleteId=req.params.id;
        let userEmail=req.headers['email'];
        const propertyName=JointProperty;
        let deleteParentElement=await DataModel1.deleteMany({_id:DeleteId,userEmail:userEmail},{session})

        let deleteChildElement=await DataModel2.deleteMany({[propertyName]:DeleteId,userEmail:userEmail},{session});
-
        await session.commitTransaction();
         session.endSession();

         return {status:'success',Parent:deleteParentElement,Child:deleteChildElement};




    }catch (e) {
          await session.abortTransaction();
          session.endSession();
          return  {status:"fail",data:e};
    }

}

module.exports=DeleteParentChildService;