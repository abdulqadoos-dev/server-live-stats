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
const SuccessWithDataResponse = require('./../responses/SuccessWithDataResponse')

const create = async(req, res, next) => {
    try {
        const { sportId, dateTime, location, mainTeamId, opponentTeamId, mainTeamPlayGround, opponentTeamPlayGround } = req.body;
        if ((await validateIds({ sportId, mainTeamId, opponentTeamId }, res)))
            return '';
        await GameService.create({ sportId, dateTime, location, mainTeamId, opponentTeamId, mainTeamPlayGround, opponentTeamPlayGround })
        return res.send(SuccessResponse('Game created successfully'))
    } catch (err) {
        return res.status(500).send(ExceptionResponse(err.message))
    }
}

const getAll = async(req, res, next) => {
    try {
        const { teamId } = req.params
        const games = await GameService.getAll(teamId);
        let gameDetails = [];
        for (let game of games) {
            game.mainTeam = await TeamService.getById(game.mainTeamId);
            game.opponentTeam = await TeamService.getById(game.opponentTeamId);
            game.sport = await SportService.getById(game.sportId);
            gameDetails.push(game)
        }
        return res.send(GetAllGamesResponse(games))
    } catch (err) {
        return res.status(500).send(ExceptionResponse(err.message))
    }
}

const verifyScheduleTime = async(req, res, next) => {
    try {
        const { dateTime, mainTeamId, opponentTeamId } = req.body;
        if (await GameService.verifyScheduleTime({ dateTime, mainTeamId, opponentTeamId })) {
            return res.send(SuccessWithDataResponse({ isScheduled: true }))
        }
        return res.send(SuccessWithDataResponse({ isScheduled: false }))
    } catch (err) {
        return res.status(500).send(ExceptionResponse(err.message))
    }
}

module.exports = {
    create,
    getAll,
    verifyScheduleTime
}

const validateIds = async({ sportId, mainTeamId, opponentTeamId }, res) => {
    if (!(await SportModal.findByPk(sportId))?.id) {
        return res.status(400).send(RequestValidationResponse({ sportId: 'Sport id is incorrect' }));
    }
    if (!(await TeamModal.findByPk(mainTeamId))?.id) {
        return res.status(400).send(RequestValidationResponse({ mainTeamId: 'Main Team id is incorrect' }));
    }
    if (!(await TeamModal.findByPk(opponentTeamId))?.id) {
        return res.status(400).send(RequestValidationResponse({ opponentTeamId: 'Opponent Team id is incorrect' }));
    }
    return false;
}