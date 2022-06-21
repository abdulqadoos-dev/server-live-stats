const modelInstance = require('./../models/index')
const MatchModel = modelInstance.match

const create = async ({matchDuration, matchPlayers, gameId, matchDetails}) => {
    return await MatchModel.create({matchDuration, matchPlayers, gameId, matchDetails})
}

module.exports = {
    create
}