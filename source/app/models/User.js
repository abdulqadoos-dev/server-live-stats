'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.profile, {as: 'profile', foreignKey:'userId'})
      this.hasOne(models.team, {as: 'team',  foreignKey:'userId'})
      this.belongsTo(models.role, {as: 'role', foreignKey: 'roleId'})
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    emailVerifiedAt: DataTypes.DATE,
    rememberToken: DataTypes.STRING,
    isAgree: DataTypes.BOOLEAN,
    roleId: DataTypes.INTEGER,
    image: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'user',
  });
  return User;
};