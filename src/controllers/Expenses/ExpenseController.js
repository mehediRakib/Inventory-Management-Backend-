const ExpenseModel=require('../../model/Expense/ExpenseModel');

let createService=require('../../services/common/CreateService');
let UpdateService=require('../../services/common/UpdateService');
let ListOneJoinService=require('../../services/common/ListOneJoinService');
let DeleteExpenseService=require('../../services/common/DeleteService');

exports.createExpense=async (req,res)=>{
    const data=await createService(req,ExpenseModel);
    res.status(200).json(data);
}

exports.updateExpense=async (req,res)=>{
    const data=await UpdateService(req,ExpenseModel);
    res.status(200).json(data);
};

exports.expenseList=async (req,res)=>{
    const joinWithExpenseType={$lookup:{from:"expensetypes",localField:"expenseTypeID",foreignField:"_id", as:"Type"}};
    let SearchRegx={$regex:req.params.searchKeyword,$options:'i'};
    let searchArray=[{Note:SearchRegx},{Ammount:SearchRegx},{"Type.name":SearchRegx}]
    let data=await ListOneJoinService(req,ExpenseModel,searchArray,joinWithExpenseType);
    res.status(200).json(data);
};

exports.deleteExpense=async (req,res)=>{
    let data=await DeleteExpenseService(req,ExpenseModel);
    res.status(200).json(data);
};

