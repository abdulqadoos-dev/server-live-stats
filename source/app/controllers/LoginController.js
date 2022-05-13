const UserService = require('./../services/UserService')
const OptService = require('./../services/OptService')
const ProfileService = require('./../services/ProfileService')
const TeamService = require('./../services/TeamService')
const jwt = require("jsonwebtoken");
const ExceptionResponse = require('./../responses/ExceptionResponse')
const UnauthorizedResponse = require('./../responses/UnauthorizedResponse')
const LoginResponse = require('./../responses/LoginResponse')
const VerifyOtpResponse = require('./../responses/VerifyOtpResponse')
const {ROLE_FAN_ID, ROLE_TEAM_ID} = require("../services/Constants");

const register = async (req, res, next) => {
    try {
        return await UserService.create(req, res)
    } catch (err) {
        return res.status(500).send(ExceptionResponse(err.message))
    }
}

const login = async (req, res, next) => {
    try {
        const user = await UserService.authenticate(req.body.email, req.body.password)
        if (user) {
            const token = jwt.sign(
                { userId: user.id },
                process.env.APP_KEY,
                {
                    expiresIn: "2h",
                }
            );
            let profile = null
            if(parseInt(user.roleId) === ROLE_FAN_ID){
                /** Get profile*/
                profile = await ProfileService.getByUserId(user.id)
            }else if(parseInt(user.roleId) === ROLE_TEAM_ID){
                /** Get team profile*/
                profile = await TeamService.getByUserId(user.id)
            }
            return res.status(200).send(LoginResponse({ user, token, profile}))
        }
        return res.status(401).send(UnauthorizedResponse('Invalid credentials'))
    } catch (err) {
        return res.status(500).send(ExceptionResponse(err.message))
    }
}

const verifyOtp = async (req, res, next) => {
    try {
        const { user_id, otp } = req.body;
        const verify = await OptService.verifyOtp(user_id, otp)
        if (verify) {
            await UserService.updateEmailVerified(user_id)
            const token = jwt.sign(
                { userId: user_id },
                process.env.APP_KEY,
                {
                    expiresIn: "3m",
                }
            );
            return res.status(200).send(VerifyOtpResponse({ token }))
        } else {
            return res.status(400).send({ validationResults: { otp: "Invalid OTP" } })
        }
    } catch (err) {
        return res.status(500).send(ExceptionResponse(err.message))
    }
}

const forgetPassword = async (req, res, next) => {
    try {
        return await UserService.forgetPassword(req, res);
    } catch (err) {
        return res.status(500).send(ExceptionResponse(err.message))
    }
}

const resetPassword = async (req, res, next) => {
    try {
        return await UserService.resetPassword(req, res)
    } catch (err) {
        return res.status(500).send(ExceptionResponse(err.message))
    }
}

module.exports = {
    register, login, verifyOtp, forgetPassword, resetPassword
}