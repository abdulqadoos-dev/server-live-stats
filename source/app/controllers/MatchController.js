const ExceptionResponse = require("../responses/ExceptionResponse");
const MatchService = require("./../services/MatchService");
const CreateMatchResponse = require("../responses/CreateMatchResponse");
const GameService = require("./../services/GameService");
const RequestValidationResponse = require("../responses/RequestValidationResponse");
const NotFoundResponse = require("../responses/NotFoundResponse");
const SuccessWithDataResponse = require("../responses/SuccessWithDataResponse");
const SuccessResponse = require("../responses/SuccessResponse");
const MailService = require('./../services/MailService')

const createMatch = async (req, res, next) => {
	try {
		const { matchDuration, matchPlayers, gameId, matchDetails } = req.body;
		if (!(await GameService.verifyId(gameId))) {
			return res.status(400).send(RequestValidationResponse({ gameId: "Game id is incorrect" }));
		}
		const match = await MatchService.create({ matchDuration, matchPlayers, gameId, matchDetails });
		return res.send(CreateMatchResponse(match));
	} catch (err) {
		return res.status(500).send(ExceptionResponse(err.message));
	}
};

const updateMatch = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { matchDuration, matchPlayers, matchDetails } = req.body;
		if (!(await MatchService.verifyId(id)) || (!matchDuration && !matchPlayers && !matchDetails)) {
			return res.status(404).send(NotFoundResponse("Request resource does not exist."));
		}
		const match = await MatchService.update({ id, matchDuration, matchPlayers, matchDetails });
		IOGlobal.emit("broadcast_game_match_"+match.id, { match, time: new Date().getTime() });
		return res.send(CreateMatchResponse(match));
	} catch (err) {
		return res.status(500).send(ExceptionResponse(err.message));
	}
};

const getMatches = async (req, res, next) => {
	try {
		const { id } = req.params;
        if(id){
            const match = await MatchService.getById(id);
            return res.send(SuccessWithDataResponse({match}))
        } else {
            const matches = await MatchService.getMyMatches(req.user.team?.id || null);
            return res.send(SuccessWithDataResponse({matches}))
        }
	} catch (err) {
		return res.status(500).send(ExceptionResponse(err.message));
	}
};

const getByGame = async (req, res, next) => {
    try{
        const {gameId} = req.params
        const matches = await MatchService.getByGameId(gameId);
        return res.send(SuccessWithDataResponse({matches}))
    } catch (err) {
		return res.status(500).send(ExceptionResponse(err.message));
	}
}

const endMatch = async (req, res, next) => {
	try{
		const {id} = req.params
		const match = await MatchService.getById(id);
		if(!match) {
			return res.status(404).send(NotFoundResponse("Request resource does not exist."))
		}
		const {homeEmail, awayEmail} = req.body;
		MatchService.endMatchEmail(match, [homeEmail, awayEmail])
		let { matchDuration, matchPlayers, matchDetails } = match;
		matchDetails = {...matchDetails, homeEmail, awayEmail}
		await MatchService.update({ id, matchDuration, matchPlayers, matchDetails });
		return res.send(SuccessResponse('Email sent successfully'))
	}catch (err) {
		return res.status(500).send(ExceptionResponse(err.message));
	}
}

module.exports = {
	createMatch,
	updateMatch,
	getMatches,
    getByGame,
	endMatch,
};
