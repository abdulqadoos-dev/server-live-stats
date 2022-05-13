const modelInstance = require('./../models/index')
const GameModal = modelInstance.game;

const create = async ({sportId, dateTime, location, team1Id, team2Id, team1PlayGround, team2PlayGround}) => {
    return await GameModal.create({sportId, dateTime, location, team1Id, team2Id, team1PlayGround, team2PlayGround})
}

module.exports = {
    create
}