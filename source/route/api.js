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
const CreatePlayerValidator = require('./../app/validators/CreatePlayerValidator')
const VerifyScheduleTimeValidator = require('./../app/validators/VerifyScheduleTimeValidator')
const uploadUserImageMiddleware = require('./../app/middlewares/UploadUserImageMiddleware')

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
routes.get('/games', authMiddleware, GameController.getAll)
routes.post('/games/verify-schedule-time', authMiddleware, VerifyScheduleTimeValidator, RunValidation, GameController.verifyScheduleTime)
/** Ends*/

module.exports = routes