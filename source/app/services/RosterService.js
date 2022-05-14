const modelInstance = require('./../models/index')
const RosterModel = modelInstance.roster
const { Op } = require("sequelize");

const create = async ({teamId, playerId}) => {
    const [response, created] = await RosterModel.findOrCreate({
        where: {teamId, playerId}
    })
    return response;
}

const deleteByPlayerId = async (playerId) => {
    await RosterModel.destroy({where: {playerId}})
}

const deleteByTeamIdAndExcludePlayerIds = async (teamId, playerIds) => {
    await RosterModel.destroy({
        where: {
            teamId,
            playerId: {
                [Op.notIn]: playerIds
            }
        }
    })
}

module.exports = {
    create, deleteByPlayerId, deleteByTeamIdAndExcludePlayerIds
}