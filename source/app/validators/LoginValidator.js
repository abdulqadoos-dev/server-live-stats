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

module.exports = {
    loginValidator, runLoginValidation
}