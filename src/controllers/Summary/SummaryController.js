const PurchaseSummaryService=require('../../services/Summary/PurchaseSummaryService');
const ReturnSummaryService=require('../../services/Summary/ReturnSummaryService');
const SalesSummaryService=require('../../services/Summary/SalesSummaryService');
const ExpenseSummaryService=require('../../services/Summary/ExpenseSummaryService');

exports.PurchaseSummary=async (req,res)=>{
    const data=await PurchaseSummaryService(req);
    res.status(200).json(data);
};

exports.ReturnSummary=async (req,res)=>{
    const data=await ReturnSummaryService(req);
    res.status(200).json(data);
};

exports.SalesSummary=async (req,res)=>{
    const data=await SalesSummaryService(req);
    res.status(200).json(data);
};

exports.ExpenseSummary=async (req,res)=>{
    const data=await ExpenseSummaryService(req);
    res.status(200).json(data);
};