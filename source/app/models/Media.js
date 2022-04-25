module.exports = (Sequelize, sequelize) => {
    return sequelize.define("media", {
        user_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'users',
                key: 'id',
                onDelete: 'CASCADE'
            }
        },
        file_type: {
            type: Sequelize.STRING
        },
        file_path: {
            type: Sequelize.STRING
        }
    })
}