const {check}=require('express-validator');
const {validationResult}=require('express-validator');

const createProfileValidator = [
    check('roleId')
        .not()
        .isEmpty()
        .withMessage("role is required"),
    check('sportId')
        .not()
        .isEmpty()
        .withMessage("sport is required"),
    check('location')
        .not()
        .isEmpty()
        .withMessage("location is required")
]

const runCreateProfileValidator=(req,res,next)=>{
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
    createProfileValidator, runCreateProfileValidator
}