const CheckAssociationService=async (queryObject,AssociationModel)=>{
    try{
        const data=await AssociationModel.aggregate([
            {$match:queryObject}
        ])

        return data.length>0
    }catch (e) {
        return false;
    }
}

module.exports=CheckAssociationService;
