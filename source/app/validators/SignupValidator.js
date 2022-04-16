const {check}=require('express-validator');
const {validationResult}=require('express-validator');

const signupValidator = [
    check('name')
        .not()
        .isEmpty()
        .withMessage("name is required"),
    check('email')
        .isEmail()
        .withMessage("enter a valid email"),
    check('password')
        .isLength({min:6})
        .withMessage("password must be 6 character long"),
    check('phone')
        .not()
        .isEmpty()
        .withMessage("phone is required")
]

const runSignupValidation=(req,res,next)=>{
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
    signupValidator, runSignupValidation
}