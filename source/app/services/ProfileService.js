const modelInstance = require('./../models/index')
const SuccessResponse = require("../responses/SuccessResponse");
const RequestValidationResponse = require("../responses/RequestValidationResponse");
const UserModal = modelInstance.user;
const ProfileModal = modelInstance.profile;
const RoleModal = modelInstance.role;
const SportModal = modelInstance.sport;

const create = async (req, res) => {
    const {roleId, sportId, location} = req.body
    if(!(await RoleModal.findByPk(roleId))?.id){
        return res.status(400).send(RequestValidationResponse({roleId:'Role id is incorrect'}));
    }
    if(!(await SportModal.findByPk(sportId))?.id){
        return res.status(400).send(RequestValidationResponse({sportId: 'Sport id is incorrect'}));
    }
    UserModal.update({roleId}, {where:{id:req.user.id}})
    const profile = (await ProfileModal.findAll({where:{userId: req.user.id,}}))?.[0] || null
    await ProfileModal.upsert({
        id: profile?.id || null,
        userId: req.user.id,
        sportId,
        location
    })
    return res.send(SuccessResponse('Profile created successfully'))
}

const getByUserId = async (userId) => {
    return (await ProfileModal.findAll({where:{userId}}))?.[0] || null
}

module.exports = {
    create, getByUserId
}