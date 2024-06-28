const ExpenseModel=require('../../model/Expense/ExpenseModel');

const ExpenseReportService=async (req)=>{
   try{
       let email=req.headers['email'];
       let fromDate=req.body['FromDate'];
       let toDate=req.body['ToDate'];

       let data=await ExpenseModel.aggregate([
           {$match:{userEmail:email,createDate:{$gte:new Date(fromDate),$lte:new Date(toDate)}}},
           {
               $facet:{
                   Total:[{
                       $group:{
                           _id:0,
                           TotalAmmount:{$sum:'$Amount'}
                       }
                   }],
                   Rows:[
                       {$lookup:{from:'expensetypes',localField:'expenseTypeID',foreignField:'_id',as:'Type'}}
                   ]
               }
           }
       ])
       return {status:"success",data:data};
   }catch (e) {
       return  {status:"fail",data:e};
   }
}

module.exports=ExpenseReportService;