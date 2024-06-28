const returnModel=require('../../model/Return/ReturnModel');
const returnProductModel=require('../../model/Return/ReturnProductModel');
const ReturnList=require('../../services/common/ListOneJoinService');
let createReturnService=require('../../services/common/CreateParentChildService');
let DeleteReturnList=require('../../services/common/DeleteParentChildService');


exports.createReturn=async (req,res)=>{
    let data=await createReturnService(req,returnModel,returnProductModel,'returnID');
    res.status(200).json(data);
};

exports.returnList=async (req,res)=>{
    let joinWithCustomer={$lookup:{from:'customers',localField:'customerID',foreignField:'_id',as:'customers'}}
    let searchRegx={$regex:req.params.searchKeyword,$options:'i'};
    let searchArray=[{'customers.customerName':searchRegx},{"customers.email":searchRegx},{"customers.address":searchRegx},{"customers.phone":searchRegx}]
    let data=await ReturnList(req,returnModel,searchArray,joinWithCustomer);
    res.status(200).json(data);
}

exports.DeleteReturnList=async (req,res)=>{
    let data=await DeleteReturnList(req,returnModel,returnProductModel,'returnID');
    res.status(200).json(data);
}