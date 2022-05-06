const modelInstance = require('./../models/index')
const SportModel = modelInstance.sport;

const get = async (req, res) => {
    return await SportModel.findAll();
}

module.exports = {
    get
}