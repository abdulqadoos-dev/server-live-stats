const modelInstance = require('./../models/index')
const { addHoursToDate } = require("./HelperService");
const GameModal = modelInstance.game;
const { Op } = require("sequelize");

const create = async({ sportId, dateTime, location, mainTeamId, opponentTeamId, mainTeamPlayGround, opponentTeamPlayGround }) => {
    return await GameModal.create({ sportId, dateTime, location, mainTeamId, opponentTeamId, mainTeamPlayGround, opponentTeamPlayGround })
}

const getAll = async(teamId = null) => {
    return teamId ? await GameModal.findAll({
            where: {
                [Op.or]: [{ mainTeamId: teamId }, { opponentTeamId: teamId }]
            },
            order: [
                ['createdAt', 'DESC']
            ],
            raw: true
        }) :
        await GameModal.findAll({ raw: true });
}

const verifyScheduleTime = async({ dateTime = new Date(), mainTeamId, opponentTeamId }) => {
    const newDateLesser = addHoursToDate(new Date(dateTime), -2)
    const newDateGreater = addHoursToDate(new Date(dateTime), 2)
    const gameTime = await GameModal.findAll({
        where: {
            [Op.and]: [
                [{ mainTeamId }, {
                    dateTime: {
                        [Op.gte]: newDateLesser,
                        [Op.lte]: newDateGreater
                    }
                }],
                [{ opponentTeamId }, {
                    dateTime: {
                        [Op.gte]: newDateLesser,
                        [Op.lte]: newDateGreater
                    }
                }]
            ]
        }
    })
    return gameTime.length === 0;
}

const verifyId = async(id) => {
    return Boolean(await GameModal.findByPk(id))
}

const getByMainTeamId = async (mainTeamId) => {
    return await GameModal.findAll({where:{mainTeamId}});
}

module.exports = {
    create,
    getAll,
    verifyScheduleTime,
    verifyId,
    getByMainTeamId
}