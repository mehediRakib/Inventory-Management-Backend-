const mongoose = require('mongoose');

let DataSchema = mongoose.Schema({
        userEmail: {type: String},
        salesID: {type: mongoose.Schema.Types.ObjectId},
        productID: {type: mongoose.Schema.Types.ObjectId},
        qty: {type: Number},
        unitCost: {type: Number},
        Total: {type: Number},
        createdDate: {type: Date, default: Date.now()}
    },
    {
        versionKey: false
    })

const SalesProductModel = mongoose.model('salesproducts', DataSchema);
module.exports = SalesProductModel;