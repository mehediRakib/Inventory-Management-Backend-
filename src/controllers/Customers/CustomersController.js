
const customerModel=require('../../model/Customers/CustomerModel');
let salesModel=require('../../model/Sales/SalesModel');
let retunrModel=require('../../model/Return/ReturnModel');

let createService=require('../../services/common/CreateService');
let DropDownService=require('../../services/common/DropDownService');
let ListService=require('../../services/common/ListService');
let UpdateService=require('../../services/common/UpdateService');
let checkAssociation=require('../../services/common/CheckAssociationService');
let DeleteService=require('../../services/common/DeleteService');
const mongoose = require("mongoose");


exports.createCustomers=async (req,res)=>{
    const data=await createService(req,customerModel);
    res.status(200).json(data);
};

exports.updateCustomers=async (req,res)=>{
    const data=await UpdateService(req,customerModel);
    res.status(200).json(data);
};

exports.customersList=async (req,res)=>{
    let searchRegx={$regex:req.params.searchKeyword, $options:"i"};
    let searchArray=[{customerName:searchRegx},{email:searchRegx},{phone:searchRegx},{address:searchRegx}];
    const data=await ListService(req,customerModel,searchArray);
    res.status(200).json(data);
};

exports.customersDropDown=async (req,res)=>{
    const data=await DropDownService(req,customerModel,{_id:1,customerName:1});
    res.status(200).json(data);
};

exports.deleteCustomers=async (req,res)=>{
    let ObjectId=mongoose.Types.ObjectId;
    let deleteId=new ObjectId(req.params.Id);
    let checkAssociationWithSales=await checkAssociation({customerID:deleteId},salesModel);
    let chackAssociationWithReturn=await checkAssociation({customerID:deleteId},retunrModel);
    if(chackAssociationWithReturn){
        res.status(200).json({status:"associate",data:"Associate with Return Model"})
    }
    else if(checkAssociationWithSales){
        res.status(200).json({status:"associate",data:'Associate with Sales Model'})
    }
    else {
        let data=await DeleteService(req,customerModel);
        res.status(200).json(data);
    }
}