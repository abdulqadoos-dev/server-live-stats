module.exports = (Sequelize, sequelize) => {
    return sequelize.define("scores", {
        game_id: {
            type: Sequelize.INTEGER
        },
        score: {
            type: Sequelize.DOUBLE
        }
    })
}