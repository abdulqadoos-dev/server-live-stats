const express = require('express');
const apiRoutes = require('./route/api');
const migration = require('./database/migration');
const seeder = require('./database/seeder');
const app = express();
const morgan = require('morgan');

/** Logging */
app.use(morgan('dev'));
/** Parse the request */
app.use(express.urlencoded({ extended: false }));
/** Takes care of JSON data */
app.use(express.json());

/** Init routes */
app.use('/',apiRoutes)
app.get('/migrate',migration.runMigration)
app.get('/seeder',seeder.runSeeder)

/** RULES OF OUR API */
app.use((req, res, next) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    // set the CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
});

/** Error handling */
app.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});
app.listen(process.env.PORT || 5000, ()=>{
    console.log(`App is listening to port ${process.env.PORT || 5000}`)
})