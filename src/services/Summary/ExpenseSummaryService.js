
const ExpenseModel=require('../../model/Expense/ExpenseModel');

const ExpenseSummaryService=async (req)=>{
    try{
        const email=req.headers['email'];
        const data=await ExpenseModel.aggregate([
            {$match:{userEmail:email}},
            {
                $facet:{
                    Total:[
                        {
                            $group:{
                                _id:0,
                                TotalAmount:{$sum:"$Amount"}
                            }
                        }
                    ],
                    Last30days:[
                        {
                            $group:{
                                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createDate" }},
                                TotalAmount:{$sum:"$Amount"}
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

module.exports=ExpenseSummaryService;