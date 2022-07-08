const modelInstance = require('./../models/index')
const MatchModel = modelInstance.match
const GameService = require('./../services/GameService')
const { Op } = require("sequelize");

const create = async ({matchDuration, matchPlayers, gameId, matchDetails}) => {
    return await MatchModel.create({matchDuration, matchPlayers, gameId, matchDetails})
}

const update = async ({id, matchDuration, matchPlayers, matchDetails}) => {
    await MatchModel.update({matchDuration, matchPlayers, matchDetails}, {where:{id}})
    return await MatchModel.findByPk(id)
}

const verifyId = async (id) => {
    return Boolean(await MatchModel.findByPk(id))
}

const getById = async (id) => {
    return await MatchModel.findByPk(id);
}

const getMyMatches = async (teamId) => {
    let gameIds = await GameService.getByMainTeamId(teamId);
    gameIds = gameIds.map(game=>game.id)
    return await MatchModel.findAll({
        where: {
            gameId:{
                [Op.in]:gameIds
            }
        }
    });
}

const getByGameId = async (gameId) => {
    return await MatchModel.findAll({where:{gameId: gameId}})
}

module.exports = {
    create, update, verifyId, getById, getMyMatches, getByGameId
}