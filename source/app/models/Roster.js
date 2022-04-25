module.exports = (Sequelize, sequelize) => {
    return sequelize.define("rosters", {
        profile_id: {
            type: Sequelize.INTEGER
        },
        details: {
            type: Sequelize.JSON
        }
    })
}