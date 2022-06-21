const ExceptionResponse = require("../responses/ExceptionResponse");
const MatchService = require('./../services/MatchService')
const CreateMatchResponse = require("../responses/CreateMatchResponse");
const GameService = require('./../services/GameService')
const RequestValidationResponse = require("../responses/RequestValidationResponse");

const createMatch = async (req, res, next) => {
    try{
        const {matchDuration, matchPlayers, gameId, matchDetails} = req.body;
        if(!(await GameService.verifyId(gameId))){
            return res.status(400).send(RequestValidationResponse({gameId:'Game id is incorrect'}))
        }
        const match = await MatchService.create({matchDuration, matchPlayers, gameId, matchDetails})
        return res.send(CreateMatchResponse(match))
    } catch (err) {
        return res.status(500).send(ExceptionResponse(err.message))
    }
}

module.exports = {
    createMatch
}