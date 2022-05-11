const modelInstance = require('./../models/index')
const RosterModel = modelInstance.roster

const create = async ({teamId, playerId}) => {
    await RosterModel.findOrCreate({
        where: {teamId,playerId}
    })
}

module.exports = {
    create
}