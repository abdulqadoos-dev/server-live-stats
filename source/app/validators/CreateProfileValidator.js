const {check}=require('express-validator');

module.exports = [
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