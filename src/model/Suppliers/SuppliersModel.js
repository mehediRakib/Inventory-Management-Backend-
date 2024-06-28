const mongoose=require('mongoose');

let DataSchema= mongoose.Schema({
        userEmail:{type:String},
        supplierName:{type:String},
        email:{type:String},
        phone:{type:String,unique:true},
        address:{type:String},
        createDate:{type:Date, default:Date.now()}
    },
    {
        versionKey:false
    })
const SupplierModel=mongoose.model('suppliers',DataSchema);

module.exports=SupplierModel;