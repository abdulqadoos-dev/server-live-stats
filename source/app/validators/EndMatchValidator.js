const {check}=require('express-validator');

module.exports = [
    check('homeEmail')
        .not()
        .isEmpty()
        .isEmail()
        .withMessage("Home Email must be an email"),
    check('awayEmail')
        .not()
        .isEmpty()
        .isEmail()
        .withMessage("Away Email must be an email"),
]