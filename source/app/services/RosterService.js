const modelInstance = require('./../models/index')
const RosterModel = modelInstance.roster

const create = async ({teamId, playerId}) => {
    const [response, created ] = await RosterModel.findOrCreate({
        where: {teamId,playerId}
    })
    return response;
}

const deleteByPlayerId = async (playerId) => {
    await RosterModel.destroy({where:{playerId}})
}

module.exports = {
    create, deleteByPlayerId
}