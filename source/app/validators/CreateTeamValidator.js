const {check}=require('express-validator');

module.exports = [
    check('roleId')
        .not()
        .isEmpty()
        .withMessage("Role is required"),
    check('sportId')
        .not()
        .isEmpty()
        .withMessage("Sport is required"),
    check('state')
        .not()
        .isEmpty()
        .withMessage("State is required"),
    check('school')
        .not()
        .isEmpty()
        .withMessage("School is required"),
    check('liveStatCode')
        .not()
        .isEmpty()
        .withMessage("LiveStat Code is required"),
    check('gender')
        .not()
        .isEmpty()
        .withMessage("Gender is required")
]