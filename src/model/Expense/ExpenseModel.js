const mongoose = require('mongoose');

let DataSchema = mongoose.Schema({
        userEmail: {type: String},
        expenseTypeID: {type: mongoose.Schema.Types.ObjectId},
        Amount: {type: Number},
        Note: {type: String},
        createDate: {type: Date, default: Date.now()}
    },
    {
        versionKey: false
    })
const ExpenseModel = mongoose.model('expenses', DataSchema);

module.exports = ExpenseModel;