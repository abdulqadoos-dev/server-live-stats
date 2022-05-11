const modelInstance = require('./../models/index')
const PlayerModel = modelInstance.player;
const RosterService = require('./RosterService')

const create = async (players, teamId) => {
    for(let player of players){
        const [response, created] = await PlayerModel.findOrCreate({
            where:{ teamId, name:player.name, number: player.number, height:player.height},
            defaults: player
        })
        await RosterService.create({teamId, playerId:response.id})
    }
}

module.exports = {
    create
}