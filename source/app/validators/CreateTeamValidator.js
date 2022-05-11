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
        .withMessage("Gender is required"),
    check('rosters')
        .not()
        .isEmpty()
        .withMessage("Rosters are required"),
    check("rosters.*.name")
        .not()
        .isEmpty()
        .withMessage("Name is required in roster"),
    check("rosters.*.number")
        .not()
        .isEmpty()
        .withMessage("Number is required in roster"),
    check("rosters.*.height")
        .not()
        .isEmpty()
        .withMessage("Height is required in roster"),
    check("rosters.*.weight")
        .not()
        .isEmpty()
        .withMessage("Weight is required in roster"),
    check("rosters.*.position")
        .not()
        .isEmpty()
        .withMessage("Position is required in roster"),
]