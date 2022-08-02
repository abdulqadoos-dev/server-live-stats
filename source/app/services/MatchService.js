const modelInstance = require('./../models/index')
const MatchModel = modelInstance.match
const GameModel = modelInstance.game
const TeamModel = modelInstance.team
const GameService = require('./GameService')
const { Op } = require("sequelize");
const MailService = require('./MailService')

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
    return await MatchModel.findOne({
        where: {id},
        include: [
            {model:GameModel, as: 'game', foreignKey: 'gameId', include:[
                { model: TeamModel, as: "mainTeam", foreignKey: "mainTeamId" },
                { model: TeamModel, as: "opponentTeam", foreignKey: "opponentTeamId" },
            ]}
        ]
    });
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

const endMatchEmail = (match, receiversEmail) => {
    const mainTeamDetails = {
        name:match.game.mainTeam.name,
        score: match.matchPlayers.mainTeamTotal || 10
    }
    const opponentTeamDetails = {
        name:match.game.opponentTeam.name,
        score: match.matchPlayers.opponentTeamTotal || 20
    }
    MailService.endMatchEmail(mainTeamDetails, opponentTeamDetails, receiversEmail)
}

module.exports = {
    create, update, verifyId, getById, getMyMatches, getByGameId, endMatchEmail
}