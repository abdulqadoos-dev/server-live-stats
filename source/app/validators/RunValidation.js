const {validationResult} = require("express-validator");
module.exports = (req,res,next)=>{
    const error=validationResult(req);
    if(!error.isEmpty()){
        let validationErrors = {};
        error.array().forEach(err => {
            validationErrors[err.param] = err.msg;
        })
        return res.status(400).send({
            validationResults: validationErrors
        })
    }
    next();
}