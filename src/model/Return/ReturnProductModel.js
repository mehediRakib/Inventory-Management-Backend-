const mongoose = require('mongoose');

let DataSchema = mongoose.Schema({
        userEmail: {type: String},
        returnID: {type: mongoose.Schema.Types.ObjectId},
        productID: {type: mongoose.Schema.Types.ObjectId},
        qty: {type: Number},
        unitCost: {type: Number},
        Total: {type: Number},
        createdDate: {type: Date, default: Date.now()}
    },
    {
        versionKey: false
    })

const ReturnProductModel = mongoose.model('returnproducts', DataSchema);
module.exports = ReturnProductModel;