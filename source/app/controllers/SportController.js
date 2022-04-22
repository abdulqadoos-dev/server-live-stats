const {model:SportModel, db} = require('../models/Sport')
const Op = db.Sequelize.Op;

const getAll = async (req, res, next) => {
    SportModel.findAll({where: null})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
}

const create = (req, res, next) => {
    SportModel.create({
        name: 'cricket',
        description: 'cricket',
        icon: 'cricket',
    }).then(data => {
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });
}


module.exports = {
    getAll, create
}
