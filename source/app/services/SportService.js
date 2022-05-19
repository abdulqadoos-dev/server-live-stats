const modelInstance = require('./../models/index')
const SportModel = modelInstance.sport;

const get = async (req, res) => {
    return await SportModel.findAll();
}

const getById = async (id) => {
    return await SportModel.findByPk(id, {raw:true})
}
module.exports = {
    get, getById
}