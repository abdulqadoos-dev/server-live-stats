'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Team extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Team.init({
        userId: DataTypes.INTEGER,
        schoolId: DataTypes.INTEGER,
        sportId: DataTypes.INTEGER,
        name: DataTypes.STRING,
        gender: DataTypes.STRING,
        liveStatCode: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'team',
    });
    return Team;
};