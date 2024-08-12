const productModel=require('../../model/Product/ProductModel');
const returnProductModel=require('../../model/Return/ReturnProductModel');
const salesProductModel=require('../../model/Sales/SalesProductModel');
const purchaseProductModel=require('../../model/Purchases/PurchaseProductModel');

let createService=require('../../services/common/CreateService');
let UpdateService=require('../../services/common/UpdateService');
let listTwoJoinService=require('../../services/common/ListTwoJoinService');
let DeleteService=require('../../services/common/DeleteService');
let CheckAssociationService=require('../../services/common/CheckAssociationService');
const mongoose = require("mongoose");
const DetailsByIdService = require("../../services/common/DetailsByIdService");
const brandModel = require("../../model/Brands/brandsModel");



exports.createProducts=async (req,res)=>{
    const data=await createService(req,productModel);
    res.status(200).json(data);
}

exports.updateProduct=async (req,res)=>{
    const data=await UpdateService(req,productModel);
    res.status(200).json(data);
};

exports.ProductList=async (req,res)=>{
    let joinWithCategory={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id", as:"category"}};
    let joinWithBrand={$lookup:{from:"brands",localField:"brandID",foreignField:"_id", as:"brand"}};
    let SearchRegx={$regex:req.params.searchKeyword,$options:'i'};
    let searchArray=[{name:SearchRegx},{details:SearchRegx},{unit:SearchRegx},{price:SearchRegx},{"category.name":SearchRegx},{"brand.name":SearchRegx}]
    let data=await listTwoJoinService(req,productModel,searchArray,joinWithCategory,joinWithBrand);
    res.status(200).json(data);
};

exports.productDetailsById=async (req,res)=>{
    const result=await DetailsByIdService(req,productModel);
    res.status(200).json(result);
}

exports.DeleteProduct=async (req,res)=>{
    let objectId=mongoose.Types.ObjectId;
    let productID=new objectId(req.params.Id);
     let checkAssociationWithReturn=await CheckAssociationService({productID:productID},returnProductModel);
     let checkAssociationWithSales=await CheckAssociationService({productID:productID},salesProductModel);
     let checkAssociationWithPurchase=await CheckAssociationService({productID:productID},purchaseProductModel);

     if(checkAssociationWithReturn){
         res.status(200).json({status:"associated",data:"associate with Return"});
     }
     else if(checkAssociationWithSales){
         res.status(200).json({status:"associated",data:"associate with Sales"});
     }
     else if(checkAssociationWithPurchase){
         res.status(200).json({status:"associated",data:"associate with Purchase"});
     }
     else
     {
         let data=await DeleteService(req,productModel);
         res.status(200).json(data);
     }


}

