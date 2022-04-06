require('dotenv').config()
const db = require('./../config/db')
const roleSeeder = require('./seeders/RoleSeeder')

const allSeeders = [
    roleSeeder
]
const runSeeder = async (req, res) => {
    let messages = [];
    try{
        for(let i=0; i<allSeeders.length; i++){
            messages.push(await allSeeders[i](db))
        }
        res.json(messages);
        console.log('Seeders run successfully')
    }catch (err){
        messages.push('error while running seeder: '+ err.message)
        res.json(messages);
        console.log('error while running seeder', err.message)
    }
}

module.exports = {runSeeder};