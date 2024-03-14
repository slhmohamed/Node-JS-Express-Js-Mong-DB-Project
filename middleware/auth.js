const jwt=require('jsonwebtoken')

module.exports=(req,res,next)=>{

    const token =req.header('x-auth-token');

    if(!token){
        return res.status(401).send('Access deniend !!')
    }
    const decoded=jwt.verify(token,process.env.SCREYKET)
    req.payload=decoded
    next();
}