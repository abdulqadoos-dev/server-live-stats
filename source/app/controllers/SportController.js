const ExceptionResponse = require("../responses/ExceptionResponse");
const SportService = require('./../services/SportService')
const GetAllSportsResponse = require("../responses/GetAllSportsResponse");

const get = async (req, res, next) => {
    try {
        const sports = await SportService.get(req, res)
        return res.send(GetAllSportsResponse(sports));
    } catch (err) {
        return res.status(500).send(ExceptionResponse(err.message))
    }
}
module.exports = {
    get
}
