const express = require('express');
const routes = express.Router();
const UserController = require('./../app/controllers/UserController')
const LoginController = require('./../app/controllers/LoginController')
const SportController = require('./../app/controllers/SportController')
const ProfileController = require('./../app/controllers/ProfileController')
const TeamController = require('./../app/controllers/TeamController')
const {runSignupValidation, signupValidator} = require('./../app/validators/SignupValidator')
const {loginValidator, runLoginValidation} = require('./../app/validators/LoginValidator')
const authMiddleware = require('./../app/middlewares/auth')
const CreateProfileValidator = require('./../app/validators/CreateProfileValidator')
const CreateTeamValidator = require('./../app/validators/CreateTeamValidator')
const RunValidation = require('./../app/validators/RunValidation')
const PlayerController = require('./../app/controllers/PlayerController')
const GameController = require('./../app/controllers/GameController')
const CreateGameValidator = require('./../app/validators/CreateGameValidator')

routes.get('/', (req, res, next)=>{
    res.json('Welcome to Nodejs app')
})

/** Auth routes*/
routes.post('/signup', signupValidator, runSignupValidation, LoginController.register)
routes.post('/login', loginValidator, runLoginValidation, LoginController.login)
routes.post('/verify-otp', LoginController.verifyOtp)
routes.post('/forget-password', LoginController.forgetPassword)
routes.post('/reset-password', LoginController.resetPassword)
/** ends */

/** Profile Routes*/
routes.post('/profile', authMiddleware, CreateProfileValidator, RunValidation, ProfileController.create)
/** Ends */

/** Users */
routes.get('/users', authMiddleware, UserController.getUsers)
routes.get('/users/:id', UserController.getUsers)
/** Ends */

/** Sports route*/
routes.get('/sports', authMiddleware, SportController.get)
/** Ends */

/** Team routes*/
routes.post('/team', authMiddleware, CreateTeamValidator, RunValidation, TeamController.create);
/** Ends*/

/** Player routes*/
routes.get('/players/', authMiddleware, PlayerController.get);
routes.get('/players/:teamId', authMiddleware, PlayerController.get);
routes.post('/player', authMiddleware, PlayerController.create);
routes.put('/player/:id', authMiddleware, PlayerController.update);
routes.delete('/player/:id', authMiddleware, PlayerController.deletePlayer)
/** Ends*/

/** Game routes*/
routes.post('/game/create', authMiddleware, CreateGameValidator, RunValidation, GameController.create)
/** Ends*/

module.exports = routes