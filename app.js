const express=require('express');
const Router=require('./src/routers/api');




const app=express();

//Security Middleware lib Import
const cors=require('cors');
const mongoSanitize=require('express-mongo-sanitize');
const helmet=require('helmet');
const xssClean=require('xss-clean');
const hpp=require('hpp');


//Database lib import
const mongoose=require('mongoose')

//Body-Parser lib Import
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');

//RateLimit lib Import
const rateLimit=require('express-rate-limit');


// security middleware Impelement
app.use(cors());
app.use(helmet());
app.use(xssClean());
app.use(hpp());
app.use(mongoSanitize());


app.use(express.json({limit:'100mb'}));
app.use(express.urlencoded({limit:'100mb'}));

//Increase the rate limit for body parser
app.use(bodyParser.json({limit:"50mb"}));
app.use(bodyParser.urlencoded({limit:'50mb'}));


//Body parser Implement
app.use(bodyParser.json());

//Request Rate Limit

const limit=rateLimit({windowMs:15*60*1000,max:3000});
app.use(limit);


const URL = "mongodb+srv://<username>:<password>@cluster0.75qh3yi.mongodb.net/Inventory?retryWrites=true&w=majority";
const option = {
    user: 'rakib107054',
    pass: 'rakib172561',
    autoIndex: true
};

mongoose.connect(URL,option).then(()=>{
    console.log("database creation successfull");
}).catch((e)=>{
    console.log(e);
})

app.use('/api/v1',Router);

app.use("*",(req,res)=>{
    res.status(404).json({status:"fail",data:"Not Found"});
})




module.exports=app;