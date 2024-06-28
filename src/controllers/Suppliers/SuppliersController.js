
const SupplierModel=require('../../model/Suppliers/SuppliersModel');
const PurchaseModel=require('../../model/Purchases/PurchasesModel')

let createService=require('../../services/common/CreateService');
let DropDownService=require('../../services/common/DropDownService');
let ListService=require('../../services/common/ListService');
let UpdateService=require('../../services/common/UpdateService');
let DeleteService=require('../../services/common/DeleteService');
let checkAssociationService=require('../../services/common/CheckAssociationService');
const mongoose = require("mongoose");


exports.createSuppliers=async (req,res)=>{
    const data=await createService(req,SupplierModel);
    res.status(200).json(data);
};

exports.updateSuppliers=async (req,res)=>{
    const data=await UpdateService(req,SupplierModel);
    res.status(200).json(data);
};

exports.suppliersList=async (req,res)=>{
    let searchRegx={$regex:req.params.searchKeyword, $options:"i"};
    let searchArray=[{supplierName:searchRegx},{email:searchRegx},{phone:searchRegx},{address:searchRegx}];
    const data=await ListService(req,SupplierModel,searchArray);
    res.status(200).json(data);
};

exports.suppliersDropDown=async (req,res)=>{
    const data=await DropDownService(req,SupplierModel,{_id:1,supplierName:1});
    res.status(200).json(data);
}

exports.DeleteSuppliers=async (req,res)=>{
    let objectId=mongoose.Types.ObjectId;
    let supplierId=new objectId(req.params.Id);
    let CheckAssociationWithPurchase=await checkAssociationService({suppliersID:supplierId},PurchaseModel);
    if(CheckAssociationWithPurchase){
        res.status(200).json({status:"associate",data:"associated with Purchases"});
    }
    else {
        let data=await DeleteService(req,SupplierModel);
        res.status(200).json(data);
    }
}