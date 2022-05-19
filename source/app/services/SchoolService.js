const modelInstance = require('./../models/index')
const SchoolModel = modelInstance.school;

const getById = async(id) => {
    return SchoolModel.findByPk(id);
}

module.exports = {
    getById
}