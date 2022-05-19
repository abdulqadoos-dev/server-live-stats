const ExceptionResponse = require("../responses/ExceptionResponse");
const TeamService = require('./../services/TeamService')
const SuccessWithDataResponse = require('./../responses/SuccessWithDataResponse')

const create = async (req, res, next) => {
    try{
        return await TeamService.create(req, res)
    } catch (err) {
        return res.status(500).send(ExceptionResponse(err.message))
    }
}

const geAll = async (req, res, next) => {
    try{
        const teams = await TeamService.getAll();
        return res.send(SuccessWithDataResponse({teams}))
    } catch (err) {
        return res.status(500).send(ExceptionResponse(err.message))
    }
}

module.exports = {
    create, geAll
}