const ExceptionResponse = require("../responses/ExceptionResponse");
const ProfileService = require("../services/ProfileService");

const create = async (req, res, next) => {
    try{
        return await ProfileService.create(req,res)
    } catch (err) {
        return res.status(500).send(ExceptionResponse(err.message))
    }
}
module.exports = {
    create
}