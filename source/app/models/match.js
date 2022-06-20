'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Match extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.game, {as: 'game', foreignKey: 'gameId'})
    }
  }
  Match.init({
    matchDuration: DataTypes.JSON,
    matchPlayers: DataTypes.JSON,
    matchDetails: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'match',
  });
  return Match;
};