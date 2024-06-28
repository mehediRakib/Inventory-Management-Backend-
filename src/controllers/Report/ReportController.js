
const ExpenseReportService=require('../../services/reports/ExpenseReportService');
const PurchaseReportService=require('../../services/reports/PurchaseReportService');
const SalesReportService=require('../../services/reports/SalesReportService');
const ReturnReportService=require('../../services/reports/ReturnReportService');

exports.ExpenseByDate=async (req,res)=>{
    let data=await ExpenseReportService(req);
    res.status(200).json(data);
};

exports.PurchaseByDate=async (req,res)=>{
    let data=await PurchaseReportService(req);
    res.status(200).json(data);
};

exports.SalesByDate=async (req,res)=>{
    let data=await SalesReportService(req);
    res.status(200).json(data);
};

exports.ReturnByDate=async (req,res)=>{
    let data=await ReturnReportService(req);
    res.status(200).json(data);
};

