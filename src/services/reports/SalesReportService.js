const SalesProductModel=require('../../model/Sales/SalesProductModel');
const PurchaseProductModel = require("../../model/Purchases/PurchaseProductModel");

const SalesReportService=async (req)=>{
    try{
        let email=req.headers['email'];
        let fromDate=req.body['FromDate'];
        let ToDate=req.body['ToDate'];

        const data=await SalesProductModel.aggregate([
            {
                $match:{userEmail:email,createdDate:{$gte:new Date(fromDate), $lte:new Date(ToDate)}},
            },
            {
                $facet:{
                    Total:[
                        {
                            $group:{
                                _id:0,
                                TotalAmount:{$sum:"$Total"}
                            }
                        }
                    ],
                    Rows:[
                        {$lookup:{from:'products',foreignField:'_id',localField:"productID",as:'Products'}},
                        {$unwind:"$Products"},
                        {$lookup:{from:'brands',localField:'Products.brandID',foreignField: '_id',as:'brand'}},
                        {$unwind:"$brand"},
                        {$lookup:{from:'categories',localField:'Products.categoryID',foreignField: '_id',as:'category'}},
                        {$unwind:"$category"},
                    ]
                }
            }
        ]);

        return {status:"success",data:data}
    }catch (e) {
        return {status:"fail",data:e};
    }

};

module.exports=SalesReportService;