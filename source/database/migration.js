require('dotenv').config()
const db = require('./../config/db')
const CreateUserTable = require('./migrations/CreateUserTableMigration');
const CreateRoleTable = require('./migrations/CreateRoleTableMigration');
const CreateOptTable = require('./migrations/CreateOptTableMigration');
const CreateMediaTable = require('./migrations/CreateMediaTableMigration');
const CreateProfileTable = require('./migrations/CreateProfileTableMigration');
const CreateSportTable = require('./migrations/CreateSportTableMigration');
const CreateTeamTable = require('./migrations/CreateTeamTableMigration');
const CreatePlayerTable = require('./migrations/CreatePlayerTableMigration');
const CreateMatchTable = require('./migrations/CreateMatchTableMigration');
const CreateScoreTable = require('./migrations/CreateScoreTableMigration');

/** Order of the list matters for foreign keys */
const data = [
    [CreateRoleTable, 'CreateRoleTable migration run successfully'],
    [CreateSportTable, 'CreateSportTable migration run successfully'],
    [CreateUserTable, 'CreateUserTable migration run successfully'],
    [CreateOptTable, 'CreateOptTable migration run successfully'],
    [CreateMediaTable, 'CreateMediaTable migration run successfully'],
    [CreateProfileTable, 'CreateProfileTable migration run successfully'],
    [CreateTeamTable, 'CreateTeamTable migration run successfully'],
    [CreatePlayerTable, 'CreatePlayerTable migration run successfully'],
    [CreateMatchTable, 'CreateMatchTable migration run successfully'],
    [CreateScoreTable, 'CreateScoreTable migration run successfully'],
]

const runMigration = async (req, res) => {
    let messages = [];
    try{
        for(let i=0; i<data.length; i++){
            await db.query(data[i][0]);
            messages.push(data[i][1])
        }
        res.json(messages);
        console.log('Migration created successfully');
    }catch (err) {
        messages.push('error while running migration: '+ err.message)
        res.json(messages);
        console.log('error while running migration', err)
    }
}

module.exports = {
    runMigration
}
