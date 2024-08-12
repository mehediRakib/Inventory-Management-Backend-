const purchaseModel=require('../../model/Purchases/PurchasesModel');
const purchaseProductModel=require('../../model/Purchases/PurchaseProductModel');
const purchaseList=require('../../services/common/ListOneJoinService');
const deletePurchase=require('../../services/common/DeleteParentChildService');

let createPurchaseService=require('../../services/common/CreateParentChildService');
const DetailsByIdService = require("../../services/common/DetailsByIdService");
const brandModel = require("../../model/Brands/brandsModel");

exports.createPurchase=async (req,res)=>{
    let data=await createPurchaseService(req,purchaseModel,purchaseProductModel,'purchaseID');
    res.status(200).json(data);
};

exports.purchaseList=async (req,res)=>{
    let searchRegx={$regex:req.params.searchKeyword,$options:'i'};
    let joinStage={$lookup:{from:'suppliers',localField:'suppliersID',foreignField:'_id',as:'Suppliers'}}
    let SearchArray=[{'Suppliers.supplierName':searchRegx}, {'Suppliers.phone':searchRegx}, {'Suppliers.address':searchRegx},{note:searchRegx}];
    let data=await purchaseList(req,purchaseModel,SearchArray,joinStage);
    res.status(200).json(data);
};

exports.purchaseDetailsById=async (req,res)=>{
    const result=await DetailsByIdService(req,purchaseModel);
    res.status(200).json(result);
}

exports.deletePurchase=async (req,res)=>{
    const data=await deletePurchase(req,purchaseModel,purchaseProductModel,'purchaseID');
    res.status(200).json(data);
}