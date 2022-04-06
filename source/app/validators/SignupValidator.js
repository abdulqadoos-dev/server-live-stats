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
        .withMessage("password must be 6 chracter long"),
    check('phone')
        .not()
        .isEmpty()
        .withMessage("phone is required")
]

const runSignupValidation=(req,res,next)=>{
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
    signupValidator, runSignupValidation
}