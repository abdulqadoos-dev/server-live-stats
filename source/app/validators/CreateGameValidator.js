const {check}=require('express-validator');

module.exports = [
    check('sportId')
        .not()
        .isEmpty()
        .withMessage("sport is required"),
    check('dateTime')
        .not()
        .isEmpty()
        .withMessage("Date & Time is required"),
    check('location')
        .not()
        .isEmpty()
        .withMessage("location is required"),
    check('team1Id')
        .not()
        .isEmpty()
        .withMessage("Team 1 Id is required"),
    check('team2Id')
        .not()
        .isEmpty()
        .withMessage("Team 2 Id is required"),
    check('team1PlayGround')
        .not()
        .isEmpty()
        .withMessage("Team 1 Play Ground is required"),
    check('team2PlayGround')
        .not()
        .isEmpty()
        .withMessage("Team 2 Play Ground is required")
]