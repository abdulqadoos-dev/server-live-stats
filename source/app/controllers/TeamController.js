const ExceptionResponse = require("../responses/ExceptionResponse");
const TeamService = require('./../services/TeamService')

const create = async (req, res, next) => {
    try{
        return await TeamService.create(req, res)
    } catch (err) {
        return res.status(500).send(ExceptionResponse(err.message))
    }
}

module.exports = {
    create
}