const ExceptionResponse = require("../responses/ExceptionResponse");
const PlayerService = require('./../services/PlayerService');
const RosterService = require('./../services/RosterService');
const SuccessResponse = require("../responses/SuccessResponse");
const GetAllPlayersResponse = require("../responses/GetAllPlayersResponse");

const create = async (req, res, next) => {
    try {
        const {name, number, weight, height, position, teamId} = req.body;
        const player = await PlayerService.create({name, number, weight, height, position}, teamId)
        await RosterService.create({teamId, playerId: player.id})
        return res.send(SuccessResponse('Player created successfully'))
    } catch (err) {
        return res.status(500).send(ExceptionResponse(err.message))
    }
}

const update = async (req, res, next) => {
    try {
        const {id} = req.params;
        const {name, number, weight, height, position} = req.body;
        await PlayerService.update({name, number, weight, height, position}, id)
        return res.send(SuccessResponse('Player updated successfully'))
    } catch (err) {
        return res.status(500).send(ExceptionResponse(err.message))
    }
}

const deletePlayer = async (req, res, next) => {
    try {
        const {id} = req.params;
        await PlayerService.deletePlayer(id);
        return res.send(SuccessResponse('Player deleted successfully'))
    } catch (err) {
        return res.status(500).send(ExceptionResponse(err.message))
    }
}

const get = async (req, res, next) => {
    try{
        const {teamId} = req.params
        const players = await PlayerService.getAll(teamId)
        return res.send(GetAllPlayersResponse(players))
    }catch (err) {
        return res.status(500).send(ExceptionResponse(err.message))
    }
}

module.exports = {
    create, update, deletePlayer, get
}