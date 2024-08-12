const brandModel=require('../../model/Brands/brandsModel');
const productModel=require('../../model/Product/ProductModel');

let createService=require('../../services/common/CreateService');
let DropDownService=require('../../services/common/DropDownService');
let ListService=require('../../services/common/ListService');
let UpdateService=require('../../services/common/UpdateService');
let checkAssociationService=require('../../services/common/CheckAssociationService');
let DeleteService=require('../../services/common/DeleteService');
let DetailsByIdService=require('../../services/common/DetailsByIdService');
const mongoose = require("mongoose");



exports.createBrand=async (req,res)=>{
    const data=await createService(req,brandModel);
    res.status(200).json(data);
}

exports.updateBrand=async (req,res)=>{
    const data=await UpdateService(req,brandModel);
    res.status(200).json(data);
}

exports.brandDropDown=async (req,res)=>{
    const data=await DropDownService(req,brandModel,{_id:1,name:1});
    res.status(200).json(data);
};

exports.brandList=async (req,res)=>{
    let searchRegx={"$regex":req.params.searchKeyword,"$options":"i"};
    let SearchArray=[{name:searchRegx}];
    const data=await ListService(req,brandModel,SearchArray);
    res.status(200).json(data);
};

exports.brandDetailsById=async (req,res)=>{
    const result=await DetailsByIdService(req,brandModel);
    res.status(200).json(result);
}

exports.DeleteBrand=async (req,res)=>{
    let DeleteID=req.params.Id;
    let ObjectID=mongoose.Types.ObjectId;
    let brandId=new ObjectID(DeleteID);
    let checkAssociation=await checkAssociationService({brandID:brandId},productModel)
    if(checkAssociation){
        res.status(200).json({status:"associate",data:"Brand is associate with a product"})
    }else {
        const data=await DeleteService(req,brandModel);
        res.status(200).json(data);
    }

}


