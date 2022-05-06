const express = require('express');
const routes = express.Router();
const UserController = require('./../app/controllers/UserController')
const LoginController = require('./../app/controllers/LoginController')
const SportController = require('./../app/controllers/SportController')
const ProfileController = require('./../app/controllers/ProfileController')
const {runSignupValidation, signupValidator} = require('./../app/validators/SignupValidator')
const {loginValidator, runLoginValidation} = require('./../app/validators/LoginValidator')
const authMiddleware = require('./../app/middlewares/auth')
const {createProfileValidator, runCreateProfileValidator} = require('./../app/validators/CreateProfileValidator')

routes.get('/', (req, res, next)=>{
    res.json('Hello world')
})

/** Auth routes*/
routes.post('/signup', signupValidator, runSignupValidation, LoginController.register)
routes.post('/login', loginValidator, runLoginValidation, LoginController.login)
routes.post('/verify-otp', LoginController.verifyOtp)
routes.post('/forget-password', LoginController.forgetPassword)
routes.post('/reset-password', LoginController.resetPassword)
/** ends */

/** Profile Routes*/
routes.post('/profile', authMiddleware, createProfileValidator, runCreateProfileValidator, ProfileController.create)
/** Ends */

/** Users */
routes.get('/users', authMiddleware, UserController.getUsers)
routes.get('/users/:id', UserController.getUsers)
/** Ends */

/** Sports route*/
routes.get('/sports', authMiddleware, SportController.get)
/** Ends */

module.exports = routes