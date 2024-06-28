const mongoose=require('mongoose');

let DataSchema= mongoose.Schema({
        userEmail:{type:String},
        name:{type:String, unique:true},
        createDate:{type:Date, default:Date.now()}
    },
    {
        versionKey:false
    })
const ExpenseTypeModel=mongoose.model('expensetypes',DataSchema);

module.exports=ExpenseTypeModel;