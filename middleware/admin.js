module.exports=(req,res,next)=>{

    if(!req.payload.role=='Admin'){
        return res.status(403).send('Acces denied !!!')
    }
    next()
}