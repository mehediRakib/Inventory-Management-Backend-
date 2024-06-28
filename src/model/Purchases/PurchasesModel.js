const mongoose = require('mongoose');

let DataSchema = mongoose.Schema({
        userEmail: {type: String},
        suppliersID: {type: mongoose.Schema.Types.ObjectId},
        VatTax: {type: Number},
        shippingCost: {type: Number},
        grandTotal: {type: Number},
        discount: {type: Number},
        otherCost: {type: Number},
        note: {type: String},
        createdDate: {type: Date, default: Date.now()}
    },
    {
        versionKey: false
    })

const PurchaseModel = mongoose.model('purchases', DataSchema);
module.exports = PurchaseModel;