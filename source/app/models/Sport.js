'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Sport extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Sport.init({
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        icon: DataTypes.STRING,
        matchTime: DataTypes.INTEGER,
        matchHalfTime: DataTypes.INTEGER,
        noPlayerRequired: DataTypes.INTEGER,
        minNoPlayers: DataTypes.INTEGER,
        maxNoPlayers: DataTypes.INTEGER,
        halfDetails: DataTypes.JSON,
    }, {
        sequelize,
        modelName: 'sport',
    });
    return Sport;
};