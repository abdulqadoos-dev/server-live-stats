const ExceptionResponse = require("../responses/ExceptionResponse");
const GameService = require("../services/GameService");
const TeamService = require("../services/TeamService");
const SportService = require("../services/SportService");
const SuccessResponse = require("../responses/SuccessResponse");
const RequestValidationResponse = require("../responses/RequestValidationResponse");
const modelInstance = require("../models");
const GetAllGamesResponse = require("../responses/GetAllGamesResponse");
const SportModal = modelInstance.sport;
const TeamModal = modelInstance.team;
const SuccessWithDataResponse = require("./../responses/SuccessWithDataResponse");
const BadRequestResponse = require("../responses/BadRequestResponse");

const create = async (req, res, next) => {
	try {
		const { sportId, dateTime, location, mainTeamId, opponentTeamId, mainTeamPlayGround, opponentTeamPlayGround } = req.body;
        if(new Date(dateTime).getTime() < new Date().getTime())
            return res.status(400).send(BadRequestResponse("Cannot create game for past date!"));
		if (await validateIds({ sportId, mainTeamId, opponentTeamId }, res)) return "";
		if (await GameService.verifyScheduleTime({ dateTime, mainTeamId, opponentTeamId })) {
			await GameService.create({ sportId, dateTime, location, mainTeamId, opponentTeamId, mainTeamPlayGround, opponentTeamPlayGround });
			return res.send(SuccessResponse("Game created successfully"));
		} else {
			return res.status(400).send(BadRequestResponse("Another game is scheduled at selected time!"));
		}
	} catch (err) {
		return res.status(500).send(ExceptionResponse(err.message));
	}
};

const getAll = async (req, res, next) => {
	try {
		const { teamId } = req.params;
		const games = await GameService.getAll(teamId);
		let gameDetails = [];
		for (let game of games) {
			game.mainTeam = await TeamService.getById(game.mainTeamId);
			game.opponentTeam = await TeamService.getById(game.opponentTeamId);
			game.sport = await SportService.getById(game.sportId);
			gameDetails.push(game);
		}
		return res.send(GetAllGamesResponse(games));
	} catch (err) {
		return res.status(500).send(ExceptionResponse(err.message));
	}
};

const verifyScheduleTime = async (req, res, next) => {
	try {
		const { dateTime, mainTeamId, opponentTeamId } = req.body;
		if (await GameService.verifyScheduleTime({ dateTime, mainTeamId, opponentTeamId })) {
			return res.send(SuccessWithDataResponse({ isScheduled: true }));
		}
		return res.send(SuccessWithDataResponse({ isScheduled: false }));
	} catch (err) {
		return res.status(500).send(ExceptionResponse(err.message));
	}
};

const getBySportId = async (req, res, next) => {
	try {
		const { sportId } = req.params;
		const games = await GameService.getBySport(sportId);
		return res.send(GetAllGamesResponse(games));
	} catch (err) {
		return res.status(500).send(ExceptionResponse(err.message));
	}
};

const validateIds = async ({ sportId, mainTeamId, opponentTeamId }, res) => {
    if(mainTeamId == opponentTeamId)
		return res.status(400).send(BadRequestResponse("Cannot create a match between two same teams!"));
	if (!(await SportModal.findByPk(sportId))?.id) {
		return res.status(400).send(RequestValidationResponse({ sportId: "Sport id is incorrect" }));
	}
	if (!(await TeamModal.findByPk(mainTeamId))?.id) {
		return res.status(400).send(RequestValidationResponse({ mainTeamId: "Main Team id is incorrect" }));
	}
	if (!(await TeamModal.findByPk(opponentTeamId))?.id) {
		return res.status(400).send(RequestValidationResponse({ opponentTeamId: "Opponent Team id is incorrect" }));
	}
	return false;
};

const update = async (req, res, next) => {
	try {
		const { id } = req.params;
		if (!(await GameService.find(id))) {
			return res.status(400).send(RequestValidationResponse({ gameId: "Game id is incorrect" }));
		}
		const { location, mainTeamPlayGround, opponentTeamPlayGround, dateTime, details } = req.body;
		const game = await GameService.update(id, { location, mainTeamPlayGround, opponentTeamPlayGround, dateTime, details });
		return res.send(SuccessWithDataResponse({ game, message: "Game updated successfully" }));
	} catch (err) {
		return res.status(500).send(ExceptionResponse(err.message));
	}
};

const updateGameDetails = async (req, res) => {
	try {
		const { id } = req.params;
		if (!(await GameService.find(id))) {
			return res.status(400).send(RequestValidationResponse({ gameId: "Game id is incorrect" }));
		}
		const { details } = req.body;
		const game = await GameService.update(id, { details });
		try{
			IOGlobal.emit("broadcast_game_" + game.id, { game, time: new Date().getTime() });
		}catch (err) {}
		return res.send(SuccessWithDataResponse({ game, message: "Game details updated successfully" }));
	} catch (err) {
		return res.status(500).send(ExceptionResponse(err.message));
	}
};

const getById = async (req, res, next) => {
	try{
		const { id } = req.params;
		const game = await GameService.find(id);
		return res.send(SuccessWithDataResponse({ game}));

	}catch (err){
		return res.status(500).send(ExceptionResponse(err.message));
	}
}

module.exports = {
	create,
	getAll,
	verifyScheduleTime,
	getBySportId,
	update,
	updateGameDetails,
	getById,
};
