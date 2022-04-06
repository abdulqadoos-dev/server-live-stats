const Pool = require('pg').Pool;
const pool = new Pool({
    'user': process.env.DATABASE_USER || 'postgres',
    'password': process.env.DATABASE_PASSWORD || 'admin',
    'database': process.env.DATABASE,
    'host': process.env.DATABASE_HOST || 'localhost',
    'port': process.env.DATABASE_PORT || 5432
});

module.exports = pool;