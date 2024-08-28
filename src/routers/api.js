const express=require('express');

const userController=require('../controllers/Users/UserController');
const brandController=require('../controllers/Brands/brandController');
const categoryController=require('../controllers/Category/CategoryController');
const customerController=require('../controllers/Customers/CustomersController');
const supplierController=require('../controllers/Suppliers/SuppliersController');
const expenseTypesController=require('../controllers/Expenses/ExpensesTypesController');
const productController=require('../../src/controllers/Products/ProductController')
const expenseController=require('../controllers/Expenses/ExpenseController');
const purchaseController=require('../controllers/Purchase/PurchaseController');
const salesController=require('../controllers/Sales/SalesController');
const returnController=require('../controllers/Return/ReturnController');
const reportController=require('../controllers/Report/ReportController');
const summaryController=require('../controllers/Summary/SummaryController');

const userAuthMiddleware=require('../middlewares/UserAuthVerificationMiddleware');


const router=express.Router();

//user Profile
router.post('/registration',userController.registration);
router.post('/login',userController.Login);
router.post('/profileUpdate',userAuthMiddleware,userController.profileUpdate);
router.get('/profileDetails',userAuthMiddleware,userController.userDetails);
router.get('/recoverVerifyEmail/:email',userController.recoverVerifyEmail);
router.get('/recoverVerifyOtp/:email/:otp',userController.recoverVeifyOtp);
router.post('/resetPassword',userController.resetPassword);

//Brand api
router.post('/createBrand',userAuthMiddleware,brandController.createBrand);
router.post('/brandUpdate/:Id',userAuthMiddleware,brandController.updateBrand);
router.get('/brandList/:pageNo/:perPage/:searchKeyword',userAuthMiddleware,brandController.brandList);
router.get('/brandDropDown',userAuthMiddleware,brandController.brandDropDown);
router.get('/DeleteBrand/:Id',userAuthMiddleware,brandController.DeleteBrand);
router.get('/brandDetailsById/:Id',userAuthMiddleware,brandController.brandDetailsById);


//Category Api
router.post('/createCategory',userAuthMiddleware,categoryController.createCategory);
router.post('/categoryUpdate/:Id',userAuthMiddleware,categoryController.updateCategory);
router.get('/categoryList/:pageNo/:perPage/:searchKeyword',userAuthMiddleware,categoryController.categoryList);
router.get('/categoryDropDown',userAuthMiddleware,categoryController.categoryDropDown);
router.get('/DeleteCategory/:Id',userAuthMiddleware,categoryController.DeleteCategory);
router.get('/categoryDetailsById/:Id',userAuthMiddleware,categoryController.categoryDetailsById);

//Customer Api
router.post('/createCustomer',userAuthMiddleware,customerController.createCustomers);
router.post('/UpdateCustomers/:Id',userAuthMiddleware,customerController.updateCustomers);
router.get('/CustomerList/:pageNo/:perPage/:searchKeyword',userAuthMiddleware,customerController.customersList);
router.get('/CustomerDropDown',userAuthMiddleware,customerController.customersDropDown);
router.get('/DeleteCustomer/:Id',userAuthMiddleware, customerController.deleteCustomers);
router.get('/customerDetailsById/:Id',userAuthMiddleware,customerController.customerDetailsById);


//Suppliers Api
router.post('/createSuppliers',userAuthMiddleware,supplierController.createSuppliers);
router.post('/UpdateSuppliers/:Id',userAuthMiddleware,supplierController.updateSuppliers);
router.get('/SupplierList/:pageNo/:perPage/:searchKeyword',userAuthMiddleware,supplierController.suppliersList);
router.get('/SupplierDropDown',userAuthMiddleware,supplierController.suppliersDropDown);
router.get('/DeleteSuppliers/:Id',userAuthMiddleware,supplierController.DeleteSuppliers);
router.get('/suppliersDetailsById/:Id',userAuthMiddleware,supplierController.suppliersDetailsById);


//Expenses Types
router.post('/createExpenseTypes',userAuthMiddleware,expenseTypesController.createExpenseTypes);
router.post('/UpdateExpenseTypes/:Id',userAuthMiddleware,expenseTypesController.updateExpensesTypes);
router.get('/ExpenseTypesList/:pageNo/:perPage/:searchKeyword',userAuthMiddleware,expenseTypesController.ExpenseTypesList);
router.get('/ExpenseTypesDropDown',userAuthMiddleware,expenseTypesController.expensesTypesDropDown);
router.get('/expenseTypesDetailsById/:Id',userAuthMiddleware,expenseTypesController.expenseTypesDetailsById);
router.get('/DeleteExpenseTypesById/:Id',userAuthMiddleware,expenseTypesController.DeleteExpenseTypesList);


// Expense
router.post('/createExpense',userAuthMiddleware,expenseController.createExpense);
router.post('/UpdateExpense/:Id',userAuthMiddleware,expenseController.updateExpense);
router.get("/ExpensesList/:pageNo/:perPage/:searchKeyword",userAuthMiddleware,expenseController.expenseList);
router.get('/DeleteExpense/:Id',userAuthMiddleware,expenseController.deleteExpense);
router.get('/expenseDetailsById/:Id',userAuthMiddleware,expenseController.expenseDetailsById);


//Product Api
router.post('/createProduct',userAuthMiddleware,productController.createProducts);
router.post('/UpdateProduct/:Id',userAuthMiddleware,productController.updateProduct);
router.get("/ProductList/:pageNo/:perPage/:searchKeyword",userAuthMiddleware,productController.ProductList);
router.get('/DeleteProduct/:Id',userAuthMiddleware,productController.DeleteProduct);
router.get('/productDetailsById/:Id',userAuthMiddleware,productController.productDetailsById);
router.get('/ProductListDropdown',userAuthMiddleware,productController.productListDropdown);


// Purchase api
router.post('/createPurchase',userAuthMiddleware,purchaseController.createPurchase);
router.get('/purchaseList/:pageNo/:perPage/:searchKeyword',userAuthMiddleware,purchaseController.purchaseList);
router.get('/deletePurchase/:id',userAuthMiddleware,purchaseController.deletePurchase);
router.get('/purchaseDetailsById/:Id',userAuthMiddleware,purchaseController.purchaseDetailsById);


//Sales api
router.post('/createSales',userAuthMiddleware,salesController.createSales);
router.get('/salesList/:pageNo/:perPage/:searchKeyword',userAuthMiddleware,salesController.SalesList);
router.get('/deleteSales/:id',userAuthMiddleware,salesController.SelesDelete);
router.get('/salesDetailsById/:Id',userAuthMiddleware,salesController.salesDetailsById);


//Return Api
router.post('/createReturn',userAuthMiddleware,returnController.createReturn);
router.get('/returnList/:pageNo/:perPage/:searchKeyword',userAuthMiddleware,returnController.returnList);
router.get('/deleteReturn/:id',userAuthMiddleware,returnController.DeleteReturnList);


//Report api
router.post('/ExpensesByDate',userAuthMiddleware,reportController.ExpenseByDate);
router.post('/PurchaseByDate',userAuthMiddleware,reportController.PurchaseByDate);
router.post('/SalesByDate',userAuthMiddleware,reportController.SalesByDate);
router.post('/ReturnByDate',userAuthMiddleware,reportController.ReturnByDate);



//Summary api
router.get('/PurchaseSummary',userAuthMiddleware,summaryController.PurchaseSummary);
router.get('/ReturnSummary',userAuthMiddleware,summaryController.ReturnSummary);
router.get('/SalesSummary',userAuthMiddleware,summaryController.SalesSummary);
router.get('/ExpenseSummary',userAuthMiddleware,summaryController.ExpenseSummary);



module.exports=router;