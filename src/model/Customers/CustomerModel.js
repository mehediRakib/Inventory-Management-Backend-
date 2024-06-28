const mongoose=require('mongoose');

let DataSchema= mongoose.Schema({
        userEmail:{type:String},
        customerName:{type:String},
        email:{type:String},
        phone:{type:String,unique:true},
        address:{type:String},
        createDate:{type:Date, default:Date.now()}
    },
    {
        versionKey:false
    })
const CustomerModel=mongoose.model('customers',DataSchema);

module.exports=CustomerModel;