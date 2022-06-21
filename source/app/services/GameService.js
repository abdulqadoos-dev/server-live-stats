const modelInstance = require('./../models/index')
const {addHoursToDate} = require("./HelperService");
const GameModal = modelInstance.game;
const {Op} = require("sequelize");

const create = async ({sportId, dateTime, location, team1Id, team2Id, team1PlayGround, team2PlayGround}) => {
    return await GameModal.create({sportId, dateTime, location, team1Id, team2Id, team1PlayGround, team2PlayGround})
}

const getAll = async (teamId = null) => {
    return teamId ? await GameModal.findAll({
            where: {
                [Op.or]: [{team1Id: teamId}, {team2Id: teamId}]
            },
            order: [['createdAt', 'DESC']],
            raw: true
        })
        : await GameModal.findAll({raw: true});
}

const verifyScheduleTime = async ({dateTime = new Date(), team1Id, team2Id}) => {
    const newDateLesser = addHoursToDate(new Date(dateTime), -2)
    const newDateGreater = addHoursToDate(new Date(dateTime), 2)
    const gameTime = await GameModal.findAll({
        where: {
            [Op.and]: [
                [{team1Id}, {dateTime: {[Op.gte]: newDateLesser, [Op.lte]: newDateGreater}}],
                [{team2Id}, {dateTime: {[Op.gte]: newDateLesser, [Op.lte]: newDateGreater}}]
            ]
        }
    })
    return gameTime.length === 0;
}

const verifyId = async (id) => {
    return Boolean(await GameModal.findByPk(id))
}

module.exports = {
    create, getAll, verifyScheduleTime, verifyId
}