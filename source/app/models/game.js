'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Game extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Game.init({
        sportId: DataTypes.INTEGER,
        mainTeamId: DataTypes.INTEGER,
        opponentTeamId: DataTypes.INTEGER,
        location: DataTypes.JSON,
        mainTeamPlayGround: DataTypes.STRING,
        opponentTeamPlayGround: DataTypes.STRING,
        dateTime: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'game',
    });
    return Game;
};