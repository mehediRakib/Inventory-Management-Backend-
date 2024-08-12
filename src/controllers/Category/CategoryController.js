
const categoryModel=require('../../model/Categories/CategoryModel');
const productModel = require("../../model/Product/ProductModel");

let createService=require('../../services/common/CreateService');
let DropDownService=require('../../services/common/DropDownService');
let ListService=require('../../services/common/ListService');
let UpdateService=require('../../services/common/UpdateService');
const mongoose = require("mongoose");
const checkAssociationService = require("../../services/common/CheckAssociationService");
const DeleteService = require("../../services/common/DeleteService");
const DetailsByIdService = require("../../services/common/DetailsByIdService");


exports.createCategory=async (req,res)=>{
    const data=await createService(req,categoryModel);
    res.status(200).json(data);
};

exports.updateCategory=async (req,res)=>{
    const data=await UpdateService(req,categoryModel);
    res.status(200).json(data);
};

exports.categoryList=async (req,res)=>{
    let searchRegx={$regex:req.params.searchKeyword, $options:"i"};
    let searchArray=[{name:searchRegx}]
    const data=await ListService(req,categoryModel,searchArray);
    res.status(200).json(data);
};

exports.categoryDropDown=async (req,res)=>{
    const data=await DropDownService(req,categoryModel,{_id:1,name:1});
    res.status(200).json(data);
};

exports.categoryDetailsById=async (req,res)=>{
    const result=await DetailsByIdService(req,categoryModel);
    res.status(200).json(result);
}

exports.DeleteCategory=async (req,res)=>{
    let DeleteID=req.params.Id;
    let ObjectID=mongoose.Types.ObjectId;
    let categoryId=new ObjectID(DeleteID);
    let checkAssociation=await checkAssociationService({categoryID:categoryId},productModel)
    if(checkAssociation){
        res.status(200).json({status:"associate",data:"Category is associate with a product"})
    }else {
        const data=await DeleteService(req,categoryModel);
        res.status(200).json(data);
    }

}