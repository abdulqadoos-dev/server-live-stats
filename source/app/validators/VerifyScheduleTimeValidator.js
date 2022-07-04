const {check}=require('express-validator');

module.exports = [
    check('dateTime')
        .not()
        .isEmpty()
        .withMessage("DateTime is required"),
    check('mainTeamId')
        .not()
        .isEmpty()
        .withMessage("Team Id is required"),
    check('opponentTeamId')
        .not()
        .isEmpty()
        .withMessage("Opponent Team must be selected")
]