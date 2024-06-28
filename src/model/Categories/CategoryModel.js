const mongoose=require('mongoose');

let DataSchema= mongoose.Schema({
        userEmail:{type:String},
        name:{type:String, unique:true},
        createDate:{type:Date, default:Date.now()}
    },
    {
        versionKey:false
    })
const CategoryModel=mongoose.model('categories',DataSchema);

module.exports=CategoryModel;