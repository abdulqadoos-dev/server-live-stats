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

const create = async (req, res, next) => {
    try{
        const {sportId, dateTime, location, team1Id, team2Id, team1PlayGround, team2PlayGround} = req.body;
        if((await validateIds({sportId, team1Id, team2Id}, res)))
            return '';
        await GameService.create({sportId, dateTime, location, team1Id, team2Id, team1PlayGround, team2PlayGround})
        return res.send(SuccessResponse('Game created successfully'))
    }catch (err) {
        return res.status(500).send(ExceptionResponse(err.message))
    }
}

const getAll = async (req, res, next) => {
    try{
        const {teamId} = req.params
        const games = await GameService.getAll(teamId);
        let gameDetails = [];
        for (let game of games) {
            game.team1 = await TeamService.getById(game.team1Id);
            game.team2 = await TeamService.getById(game.team2Id);
            game.sport = await SportService.getById(game.sportId);
            gameDetails.push(game)
        }
        return res.send(GetAllGamesResponse(games))
    }catch (err) {
        return res.status(500).send(ExceptionResponse(err.message))
    }
}

const verifyScheduleTime = async (req, res, next) => {
    try{
        const {dateTime, team1Id, team2Id} = req.body;
        if(await GameService.verifyScheduleTime({dateTime, team1Id, team2Id})){
            return res.send(SuccessWithDataResponse({isScheduled:true}))
        }
        return res.send(SuccessWithDataResponse({isScheduled:false}))

    }catch (err) {
        return res.status(500).send(ExceptionResponse(err.message))
    }
}

module.exports = {
    create, getAll, verifyScheduleTime
}

const validateIds = async ({sportId, team1Id, team2Id}, res) => {
    if (!(await SportModal.findByPk(sportId))?.id) {
        return res.status(400).send(RequestValidationResponse({sportId: 'Sport id is incorrect'}));
    }
    if (!(await TeamModal.findByPk(team1Id))?.id) {
        return res.status(400).send(RequestValidationResponse({sportId: 'Team 1 id is incorrect'}));
    }
    if (!(await TeamModal.findByPk(team2Id))?.id) {
        return res.status(400).send(RequestValidationResponse({sportId: 'Team 2 id is incorrect'}));
    }
    return false;
}
