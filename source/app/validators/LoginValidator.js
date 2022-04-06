const {check}=require('express-validator');
const {validationResult}=require('express-validator');

const loginValidator = [
    check('email')
        .not()
        .isEmpty()
        .withMessage("email is required"),
    check('password')
        .not()
        .isEmpty()
        .withMessage("password is required")
]

const runLoginValidation=(req,res,next)=>{
    const error=validationResult(req);
    if(!error.isEmpty()){
        return res.status(401).send({
            status:'error',
            message:error.array().map(err => ({key:err.param, message:err.msg}))
        })
    }
    next();
}

module.exports = {
    loginValidator, runLoginValidation
}