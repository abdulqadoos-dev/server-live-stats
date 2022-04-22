const dbConfigs = require('./../../config/db.configs');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfigs.DB, dbConfigs.USER, dbConfigs.PASSWORD, {
    host: dbConfigs.HOST,
    dialect: dbConfigs.dialect,
    operatorsAliases : false,
    pool:{
        max : dbConfigs.pool.max,
        min : dbConfigs.pool.min,
        acquire: dbConfigs.pool.acquire,
        idle: dbConfigs.pool.idle
    }
});

const db={};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
module.exports = db;