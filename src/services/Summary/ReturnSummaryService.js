
const ReturnModel=require('../../model/Return/ReturnModel');

const ReturnSummaryService=async (req)=>{
    try{
        const email=req.headers['email'];
        const data=await ReturnModel.aggregate([
            {$match:{userEmail:email}},
            {
                $facet:{
                    Total:[
                        {
                            $group:{
                                _id:0,
                                TotalAmount:{$sum:"$grandTotal"}
                            }
                        }
                    ],
                    Last30days:[
                        {
                            $group:{
                                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdDate" }},
                                TotalAmount:{$sum:"$grandTotal"}
                            }
                        },
                        {$sort:{_id:-1}},
                        {$limit:30}
                    ]
                }
            }
        ])
        return {status:"success",data:data};
    }catch (e) {
        return {status:"fail",data:e}
    }

};

module.exports=ReturnSummaryService;