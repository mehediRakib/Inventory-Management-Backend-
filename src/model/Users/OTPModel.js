const mongoose=require('mongoose');

const DataSchema=mongoose.Schema({
    email:{type:String},
    otp:{type:String},
    status:{type:Number,default:0},
    createdDate:{type:Date,default: Date.now()}
},
    {
        versionKey:false
    })

const OtpModel=mongoose.model('otps',DataSchema);

module.exports=OtpModel;