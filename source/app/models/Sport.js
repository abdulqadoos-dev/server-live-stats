const db = require("./index");
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;

const model = () => {
    return sequelize.define("sports", {
        name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        icon: {
            type: Sequelize.STRING
        },
        match_time:{
            type: Sequelize.INTEGER
        },
        match_half_time:{
            type: Sequelize.INTEGER
        },
        no_players_required:{
            type: Sequelize.INTEGER
        },
        min_no_players:{
            type: Sequelize.INTEGER
        },
        max_no_players:{
            type: Sequelize.INTEGER
        }
    })
}

module.exports = {
    db: db,
    model: model()
}