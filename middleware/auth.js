const jwt = require("jsonwebtoken")

module.exports=(req,res,next)=>{
    const authHeader= req.get('Authorization')
    if(!authHeader){
        req.isAuth=false
        return next()
    }
    const token=authHeader.split(' ')[1]
    if(!token){
        req.isAuth=false
        next()
    }
    let verify;
    try{
        verify=jwt.verify(token,'supersecretkey')
    }catch(err){
        req.isAuth=false
        return next()
    }
    
    req.isAuth=true
    req.userId=verify.userId
    return next()
}