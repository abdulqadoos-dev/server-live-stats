const {check}=require('express-validator');
module.exports = [
    check('gameId')
        .not()
        .isEmpty()
        .withMessage("Game Id is required"),
    check('matchDuration')
        .not()
        .isEmpty()
        .withMessage("Match Duration is required"),
    check('matchPlayers')
        .not()
        .isEmpty()
        .withMessage("Match Players is required"),
    check('matchDetails')
        .not()
        .isEmpty()
        .withMessage("Match Details is required"),
]