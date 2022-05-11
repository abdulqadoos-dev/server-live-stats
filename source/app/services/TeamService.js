const modelInstance = require('./../models/index')
const SuccessResponse = require("../responses/SuccessResponse");
const RequestValidationResponse = require("../responses/RequestValidationResponse");
const TeamModal = modelInstance.team;
const RoleModal = modelInstance.role;
const SportModal = modelInstance.sport;
const SchoolModal = modelInstance.school;
const UserModal = modelInstance.user;
const PlayerService = require('./PlayerService')

const create = async (req, res) => {
    const {roleId, sportId, rosters} = req.body
    if (!(await RoleModal.findByPk(roleId))?.id) {
        return res.status(400).send(RequestValidationResponse({roleId:'Role id is incorrect'}));
    }
    const sport = await SportModal.findByPk(sportId)
    if (!sport?.id) {
        return res.status(400).send(RequestValidationResponse({sportId: 'Sport id is incorrect'}));
    }
    await UserModal.update({roleId}, {where:{id:req.user.id}})
    let school = (await SchoolModal.findAll({where: {name: req.body.school, state: req.body.state}}))?.[0] || null
    if (!school) {
        school = await SchoolModal.create({
            name: req.body.school,
            state: req.body.state
        })
    }
    let team = (await TeamModal.findAll({where:{userId: req.user.id,}}))?.[0] || null
    if(!team){
        team = await TeamModal.create({
            userId: req.user.id,
            schoolId: school.id,
            sportId,
            liveStatCode: req.body.liveStatCode,
            name: req.body.school + ' ' + req.body.gender + ' ' + sport.name,
            gender: req.body.gender
        })
    }
    await PlayerService.bulkCreate(rosters, team.id)
    return res.send(SuccessResponse('Team created successfully'))
}

module.exports = {
    create
}