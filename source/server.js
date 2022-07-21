const express = require('express');
const apiRoutes = require('./route/api');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const http = require("http");
const socketsUtili = require('./app/sockets/InitSocket')

app.use(cors())

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

/** Logging */
app.use(morgan('dev'));
/** Parse the request */
app.use(express.urlencoded({ extended: false }));
/** Takes care of JSON data */
app.use(express.json());

/** Function to serve all static files */
/** inside public directory. */
app.use(express.static('public'));
app.use('/images', express.static('images'));

/** Init routes */
app.use('/',apiRoutes)

/** Error handling */
app.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

const server = http.createServer(app);

/** Sockets Initialization */
const io = socketsUtili.io(server);
socketsUtili.connection(io)
/** Sockets Ends */

server.listen(process.env.PORT || 5000, ()=>{
    console.log(`App is listening to port ${process.env.PORT || 5000}`)
})