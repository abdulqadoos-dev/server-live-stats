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
db.games = require('./Game')(Sequelize, sequelize);
db.media = require('./Media')(Sequelize, sequelize);
db.otps = require('./Opt')(Sequelize, sequelize);
db.profiles = require('./Profile')(Sequelize, sequelize);
db.rosters = require('./Roster')(Sequelize, sequelize);
db.scores = require('./Score')(Sequelize, sequelize);
db.sports = require('./Sport')(Sequelize, sequelize);
module.exports = db;