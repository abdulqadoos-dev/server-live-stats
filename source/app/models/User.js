const bcrypt = require('bcrypt')
const db = require('./../../config/db');
const {getDate, camelToSnakeCase} = require('./../services/HelperService')
const table = 'users';
const saltRounds = 10;

const get = async (where = null) => {
    let res;
    if(where){
        res = await db.query(`SELECT * FROM ${table} WHERE ${where}`);
    }else{
        res = await db.query(`SELECT * FROM ${table}`);
    }
    return res.rows
}

const findByEmail = async (email) => {
    const res = await db.query(`SELECT * FROM ${table} WHERE email=$1`,[email])
    return res.rows[0] || null
}

const create = async (data) => {
    data = {...data, created_at:getDate(), updated_at:getDate()}
    if(data.password){
        data.password = bcrypt.hashSync(data.password, saltRounds);
    }
    const keys = Object.keys(data)
    const values = keys.map((key, i)=>'$'+(i+1)).join(', ')
    let res = await db.query(`INSERT INTO ${table} (${keys.join(', ')}) VALUES (${values}) RETURNING *`, keys.map(key=>data[key]))
    return res.rows[0] || null
}

const authenticate = async (email, password) => {
    let res = await db.query(`SELECT * FROM ${table} WHERE (email=$1 OR phone=$2) AND email_verified_at <= $3`, [email, email, getDate()]);
    res = res.rows[0] || null
    if(res?.password && bcrypt.compareSync(password, res.password)){
        return res;
    }
    return null;
}

const update = async (where, data) => {
    data = {...data, updated_at: getDate()}
    if(data.password){
        data.password = bcrypt.hashSync(data.password, saltRounds);
    }
    const whereKeys = Object.keys(where)
    const dataKeys = Object.keys(data)
    const set = dataKeys.map(key=>`${camelToSnakeCase(key)}='${data[key]}'`).join(', ')
    where = whereKeys.map(key=>`${camelToSnakeCase(key)}='${where[key]}'`).join(' AND ')
    const res = await db.query(`UPDATE ${table} SET ${set} WHERE ${where} RETURNING *`);
    return res.rows[0] || null
}

module.exports = {
    get, create, findByEmail, authenticate, update
}