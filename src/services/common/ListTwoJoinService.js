
const ListTwoJoinService=async (req,DataModel,SearchArray,JoinStage1,JoinStage2)=>{
    try {
        let pageNo=Number(req.params.pageNo);
        let perPage=Number(req.params.perPage);
        let searchKeyWord=req.params.searchKeyword;
        let email=req.headers['email'];

        let skipRow=(pageNo-1)*perPage;
        let data;

        if(searchKeyWord!=="0"){
            let searchQuery={$or:SearchArray};
            data=await DataModel.aggregate([
                {$match:{userEmail:email}},
                JoinStage1,
                JoinStage2,
                {$match:searchQuery},

                {
                    $facet:{
                        Total:[{$count:'count'}],
                        Rows:[{$skip:skipRow},{$limit:perPage}]
                    }
                }
            ])
        }
        else {
            data=await DataModel.aggregate([
                {$match:{userEmail:email}},
                JoinStage1,
                JoinStage2,
                {
                    $facet:{
                        Total:[{$count:'count'}],
                        Rows:[{$skip:skipRow},{$limit:perPage}]
                    }
                }
            ])

        }
        return { status:"success",data:data};
    }catch (e) {
        return {status:"fail",data:e.toString()};
    }
}

module.exports=ListTwoJoinService;