const {check}=require('express-validator');

module.exports = [
    check('teamId')
        .not()
        .isEmpty()
        .withMessage("Team Id is required"),
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
        .withMessage("Position is required in roster")
]