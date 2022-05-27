const ExceptionResponse = require("../responses/ExceptionResponse");
const SuccessWithDataResponse = require('./../responses/SuccessWithDataResponse')
const ProfileService = require("../services/ProfileService");
const {ROLE_FAN_ID, ROLE_TEAM_ID} = require("../services/Constants");
const TeamService = require("../services/TeamService");
const SchoolService = require("../services/SchoolService");

const create = async (req, res, next) => {
    try{
        return await ProfileService.create(req,res)
    } catch (err) {
        return res.status(500).send(ExceptionResponse(err.message))
    }
}

const get = async (req, res, next) => {
    try{
        let profile = null
        if(parseInt(req.user.roleId) === ROLE_FAN_ID){
            /** Get profile*/
            profile = await ProfileService.getByUserId(req.user.id)
        }else if(parseInt(req.user.roleId) === ROLE_TEAM_ID){
            /** Get team profile*/
            profile = await TeamService.getByUserId(req.user.id)
            profile.school = await SchoolService.getById(profile.schoolId)
        }
        return res.send(SuccessWithDataResponse({profile}))
    } catch (err) {
        return res.status(500).send(ExceptionResponse(err.message))
    }
}

module.exports = {
    create, get
}