module.exports = (Sequelize, sequelize) => {
    return sequelize.define("games", {
        sport_id: {
            type: Sequelize.INTEGER
        },
        date_time: {
            type: Sequelize.DATE
        },
        location: {
            type: Sequelize.STRING
        },
        zip: {
            type: Sequelize.STRING
        },
        team1_id: {
            type: Sequelize.INTEGER
        },
        team2_id: {
            type: Sequelize.INTEGER
        }
    })
}