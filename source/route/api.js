const express = require('express');
const routes = express.Router();
/**
 * Controller imports
 */
const UserController = require('./../app/controllers/UserController')
const LoginController = require('./../app/controllers/LoginController')
const SportController = require('./../app/controllers/SportController')
const ProfileController = require('./../app/controllers/ProfileController')
const TeamController = require('./../app/controllers/TeamController')
const PlayerController = require('./../app/controllers/PlayerController')
const GameController = require('./../app/controllers/GameController')
const MatchController = require('./../app/controllers/MatchController')
/**
 * Middlewares imports
 */
const authMiddleware = require('./../app/middlewares/auth')
const uploadUserImageMiddleware = require('./../app/middlewares/UploadUserImageMiddleware')
/**
 * Validations import
 */
const {runSignupValidation, signupValidator} = require('./../app/validators/SignupValidator')
const {loginValidator, runLoginValidation} = require('./../app/validators/LoginValidator')
const RunValidation = require('./../app/validators/RunValidation')
const CreateProfileValidator = require('./../app/validators/CreateProfileValidator')
const CreateTeamValidator = require('./../app/validators/CreateTeamValidator')
const CreateGameValidator = require('./../app/validators/CreateGameValidator')
const CreatePlayerValidator = require('./../app/validators/CreatePlayerValidator')
const VerifyScheduleTimeValidator = require('./../app/validators/VerifyScheduleTimeValidator')
const CreateMatchValidator = require('./../app/validators/CreateMatchValidator');
const EndMatchValidator = require('../app/validators/EndMatchValidator');

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
routes.get('/profile', authMiddleware, ProfileController.get)
/** Ends */

/** Users */
routes.get('/users', authMiddleware, UserController.getUsers)
routes.get('/users/:id', authMiddleware, UserController.getUsers)
routes.post('/user/upload-image', authMiddleware, uploadUserImageMiddleware.single('image'), UserController.upload_image)
/** Ends */

/** Sports route*/
routes.get('/sports', authMiddleware, SportController.get)
/** Ends */

/** Team routes*/
routes.post('/team', authMiddleware, CreateTeamValidator, RunValidation, TeamController.create);
routes.get('/teams', authMiddleware, TeamController.geAll)
/** Ends*/

/** Player routes*/
routes.get('/players', authMiddleware, PlayerController.get);
routes.get('/players/:teamId', authMiddleware, PlayerController.get);
routes.post('/player', authMiddleware, PlayerController.create);
routes.put('/player/:id', authMiddleware, PlayerController.update);
routes.delete('/player/:id', authMiddleware, PlayerController.deletePlayer)
routes.post('/players', authMiddleware, CreatePlayerValidator, RunValidation, PlayerController.saveNewBulk)
/** Ends*/

/** Game routes*/
routes.post('/game/create', authMiddleware, CreateGameValidator, RunValidation, GameController.create)
// routes.get('/games', authMiddleware, GameController.getAll)
routes.get('/games/:teamId', authMiddleware, GameController.getAll)
routes.post('/games/verify-schedule-time', authMiddleware, VerifyScheduleTimeValidator, RunValidation, GameController.verifyScheduleTime)
routes.get('/games/sport/:sportId', authMiddleware, GameController.getBySportId);
/** Ends*/

/** Match routes */
routes.get('/matches',authMiddleware, MatchController.getMatches);
routes.get('/matches/game/:gameId', authMiddleware, MatchController.getByGame);
routes.get('/match/:id',authMiddleware, MatchController.getMatches);
routes.post('/match/create', authMiddleware, CreateMatchValidator, RunValidation, MatchController.createMatch)
routes.post('/match/update/:id', authMiddleware, MatchController.updateMatch)
routes.post('/match/end-match/:id', authMiddleware, EndMatchValidator, RunValidation, MatchController.endMatch)
/** Ends */

module.exports = routes