module.exports = (Sequelize, sequelize) => {
    return sequelize.define("profiles", {
        user_id: {
            type: Sequelize.INTEGER
        },
        location: {
            type: Sequelize.JSON
        },
        banner: {
            type: Sequelize.JSON
        },
        sport_id:{
            type: Sequelize.INTEGER
        }
    })
}