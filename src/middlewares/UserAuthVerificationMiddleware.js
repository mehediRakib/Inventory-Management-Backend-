const jwt=require('jsonwebtoken');
const DecodeToken=(req,res,next)=>{
    const Token=req.headers['token'];
    jwt.verify(Token,'SecretKey123456',function (err,decode){
        if(err){

            res.status(401).json({status:"Unauthorized"})
        }else {
            let email=decode['data'];
            req.headers.email=email;
            next();
        }
    }) 
}

module.exports=DecodeToken;