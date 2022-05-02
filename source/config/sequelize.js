require('dotenv').config()
const dbConfigs = require('./db.configs')
module.exports = {
    "development": {
        "username": dbConfigs.USER,
        "password": dbConfigs.PASSWORD,
        "database": dbConfigs.DB,
        "host": dbConfigs.HOST,
        "dialect": dbConfigs.dialect
    },
    "test": {
        "username": dbConfigs.USER,
        "password": dbConfigs.PASSWORD,
        "database": dbConfigs.DB,
        "host": dbConfigs.HOST,
        "dialect": dbConfigs.dialect
    },
    "production": {
        "username": dbConfigs.USER,
        "password": dbConfigs.PASSWORD,
        "database": dbConfigs.DB,
        "host": dbConfigs.HOST,
        "dialect": dbConfigs.dialect
    }
}