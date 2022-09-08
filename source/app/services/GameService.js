const modelInstance = require('./../models/index')
const { addHoursToDate } = require("./HelperService");
const GameModal = modelInstance.game;
const TeamModal = modelInstance.team;
const SportModal = modelInstance.sport;
const MatchModel = modelInstance.match;
const UserModel = modelInstance.user;
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

const getBySport = async (sportId) => {
    return await GameModal.findAll({where:{sportId}, include:[
        {model: TeamModal, as: 'mainTeam', foreignKey: 'mainTeamId', 
            include:{model: UserModel, as: "user", foreignKey: "userId", attributes:['id', 'image']}
        },
        {model: TeamModal, as: 'opponentTeam', foreignKey: 'opponentTeamId',
            include:{model: UserModel, as: "user", foreignKey: "userId", attributes:['id', 'image']}
        },
        {model: SportModal, as: 'sport', foreignKey: 'sportId'}
    ]})
}

const find = async (id) => {
    return await GameModal.findOne({
        where: { id },
        include: [
            { model: TeamModal, as: "mainTeam", foreignKey: "mainTeamId", 
                include:{model: UserModel, as: "user", foreignKey: "userId", attributes:['id', 'image']}
            },
            { model: TeamModal, as: "opponentTeam", foreignKey: "opponentTeamId", 
                include:{model: UserModel, as: "user", foreignKey: "userId", attributes:['id', 'image']}
            },
            { model: SportModal, as: "sport", foreignKey: "sportId" },
            // { model: MatchModel, as: "match", foreignKey:"gameId"}
        ],
    });
}

const update = async (id, requestBody) => {
    await GameModal.update(requestBody, {where:{id}})
    return await find(id)
}

module.exports = {
    create,
    getAll,
    verifyScheduleTime,
    verifyId,
    getByMainTeamId,
    getBySport,
    find,
    update
}