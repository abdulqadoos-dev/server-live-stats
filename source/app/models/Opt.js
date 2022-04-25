// const db = require('./../../config/db');
// const table = 'opts';
// const getDate = require('./../services/HelperService').getDate()
//
// const create = async (user_id, otp) => {
//     let res = db.query('INSERT INTO opts (user_id, code, created_at, updated_at) VALUES ($1, $2, $3, $4) RETURNING *', [user_id, otp, getDate, getDate])
//     return res.rows?.[0] || null
// }
//
// const verify = async (user_id, code) => {
//     const res = await db.query(`SELECT * FROM ${table} WHERE user_id =$1 AND code=$2`, [user_id, code])
//     return res.rows?.[0] || null
// }
//
// const deleteByUser = async (user_id) => {
//     await db.query(`DELETE FROM ${table} WHERE user_id=$1`, [user_id]);
// }
//
// module.exports = { create, verify, deleteByUser }

module.exports = (Sequelize, sequelize) => {
    return sequelize.define("otps", {
        user_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'users',
                key: 'id',
                onDelete: 'CASCADE'
            }
        },
        code: {
            type: Sequelize.INTEGER
        }
    })
}