const dbConfigs = require('./../../config/db.configs');
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
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

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

db.Sequelize = Sequelize;
db.sequelize = sequelize;
module.exports = db;