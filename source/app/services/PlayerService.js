const modelInstance = require('./../models/index')
const PlayerModel = modelInstance.player;
const RosterService = require('./RosterService')

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
        const response = await create(player, teamId)
        await RosterService.create({teamId, playerId: response.id})
    }
}

const update = async (player, id) => {
    return await PlayerModel.update(player, {where:{id}})
}

const deletePlayer = async (id) => {
    await RosterService.deleteByPlayerId(id)
    return await PlayerModel.destroy({where:{id}})
}
module.exports = {
    create, bulkCreate, update, deletePlayer, getAll
}