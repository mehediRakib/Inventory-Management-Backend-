const salesModel=require('../../model/Sales/SalesModel');
const salesProductModel=require('../../model/Sales/SalesProductModel');

const salesList=require('../../services/common/ListOneJoinService');
let createSalesService=require('../../services/common/CreateParentChildService');
let deleteSalesService=require('../../services/common/DeleteParentChildService');
const DetailsByIdService = require("../../services/common/DetailsByIdService");
const brandModel = require("../../model/Brands/brandsModel");

const createSales=async (req,res)=>{
    let data=await createSalesService(req,salesModel,salesProductModel,"salesID");
    res.status(200).json(data);
};

const SalesList=async (req,res)=>{
    let jointWithCustomer={$lookup:{from:'customers',localField:'customerID',foreignField:'_id',as:'customers'}}
    let searchRegx={$regex:req.params.searchKeyword,$options:'i'};
    let searchArray=[{'customers.customerName':searchRegx},{"customers.email":searchRegx},{"customers.address":searchRegx},{"customers.phone":searchRegx}]
    let data=await salesList(req,salesModel,searchArray,jointWithCustomer)
    res.status(200).json(data);
};

const salesDetailsById=async (req,res)=>{
    let result=await DetailsByIdService(req,salesModel);
    res.status(200).json(result);
};

const SelesDelete=async (req,res)=>{
    let data=await deleteSalesService(req,salesModel,salesProductModel,'salesID')
    res.status(200).json(data);
}

module.exports={
    createSales,
    SalesList,
    SelesDelete,
    salesDetailsById
}
