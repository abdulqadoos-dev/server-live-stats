const {check}=require('express-validator');

module.exports = [
    check('dateTime')
        .not()
        .isEmpty()
        .withMessage("DateTime is required"),
    check('team1Id')
        .not()
        .isEmpty()
        .withMessage("Team1Id is required"),
    check('team2Id')
        .not()
        .isEmpty()
        .withMessage("Opponent Team must be selected")
]