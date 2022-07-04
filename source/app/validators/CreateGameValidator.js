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
    check('mainTeamId')
        .not()
        .isEmpty()
        .withMessage("Team Id is required"),
    check('opponentTeamId')
        .not()
        .isEmpty()
        .withMessage("Opponent Team Id is required"),
    check('mainTeamPlayGround')
        .not()
        .isEmpty()
        .withMessage("Main Team Play Ground is required"),
    check('opponentTeamPlayGround')
        .not()
        .isEmpty()
        .withMessage("Opponent Team Play Ground is required")
]