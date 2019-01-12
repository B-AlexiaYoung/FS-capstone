module.exports=(req,res,next )=>{
    //console.log("require", req.user)
    if(!req.user){
        return res.status(401).send({error:"You must be logged in"})
    }
    next();
}