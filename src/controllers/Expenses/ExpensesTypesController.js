const expensesTypeModel=require('../../model/Expense/ExpensesTypesModel');

let createService=require('../../services/common/CreateService');
let DropDownService=require('../../services/common/DropDownService');
let ListService=require('../../services/common/ListService');
let UpdateService=require('../../services/common/UpdateService');

exports.createExpenseTypes=async (req,res)=>{
    const data=await createService(req,expensesTypeModel);
    res.status(200).json(data);
}

exports.updateExpensesTypes=async (req,res)=>{
    const data=await UpdateService(req,expensesTypeModel);
    res.status(200).json(data);
}

exports.expensesTypesDropDown=async (req,res)=>{
    const data=await DropDownService(req,expensesTypeModel,{_id:1,name:1});
    res.status(200).json(data);
};

exports.ExpenseTypesList=async (req,res)=>{
    let searchRegx={"$regex":req.params.searchKeyword,"$options":"i"};
    let SearchArray=[{name:searchRegx}];
    const data=await ListService(req,expensesTypeModel,SearchArray);
    res.status(200).json(data);
}

