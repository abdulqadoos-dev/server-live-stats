const modelInstance = require('./../models/index')
const PlayerModel = modelInstance.player;
const RosterService = require('./RosterService')
const { Op } = require("sequelize");

const getAll = async (teamId = null) => {
    return await PlayerModel.findAll(teamId ? {where:{teamId}} : {})
}

const create = async (player, teamId) => {
    const [response, created] = await PlayerModel.findOrCreate({
        where: {teamId, name: player.name, number: player.number, height: player.height},
        defaults: player
    })
    return response
}

const bulkCreate = async (players, teamId) => {
    for (let player of players) {
        const response = player?.id ? await update(player, player.id) : await create(player, teamId)
        await RosterService.create({teamId, playerId: player?.id || response.id})
    }
}

const update = async (player, id) => {
    return await PlayerModel.update(player, {where:{id}})
}

const deletePlayer = async (id) => {
    await RosterService.deleteByPlayerId(id)
    return await PlayerModel.destroy({where:{id}})
}

const deleteByTeamIdAndExcludeIds = async (teamId, ids) => {
    await RosterService.deleteByTeamIdAndExcludePlayerIds(teamId, ids)
    return await PlayerModel.destroy({
        where:{
            teamId,
            id: {
                [Op.notIn]: ids
            }
        }
    })
}
module.exports = {
    create, bulkCreate, update, deletePlayer, getAll, deleteByTeamIdAndExcludeIds
}