const mongoose = require('mongoose');

let DataSchema = mongoose.Schema({
        userEmail: {type: String},
        categoryID: {type: mongoose.Schema.Types.ObjectId},
        brandID: {type: mongoose.Schema.Types.ObjectId},
        name: {type: String},
        unit: {type: String},
        price:{type: String},
        details:{type:String},
        createDate: {type: Date, default: Date.now()}
    },
    {
        versionKey: false
    })
const ProductModel = mongoose.model('products', DataSchema);

module.exports = ProductModel;