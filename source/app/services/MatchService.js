const modelInstance = require('./../models/index')
const MatchModel = modelInstance.match

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

module.exports = {
    create, update, verifyId
}