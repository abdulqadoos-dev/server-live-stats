const UserModal = require('./../models/User')
const UserService = require('./../services/UserService')
const OptService = require('./../services/OptService')
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
    try {
        return await UserService.create(req, res)
    } catch (err) {
        return res.status(500).send({
            status: 'error',
            status_code: 500,
            message: err.message
        })
    }
}

const login = async (req, res, next) => {
    try{
        const user = await UserModal.authenticate(req.body.email, req.body.password)
        if(user){
            const token = jwt.sign(
                { user_id: user.id},
                process.env.APP_KEY,
                {
                    expiresIn: "2h",
                }
            );
            return res.status(200).send({
                status: 'success',
                status_code: 200,
                message: 'success',
                user,
                token,
                expiresIn: '2h'
            })
        }
        return res.status(401).send({
            status: 'error',
            status_code: 401,
            message: 'Invalid credentials'
        })

    }catch (err) {
        return res.status(500).send({
            status: 'error',
            status_code: 500,
            message: err.message
        })
    }
}

const verifyOtp = async (req, res, next) => {
    try{
        const {user_id, otp} = req.body;
        const verify = await OptService.verifyOtp(user_id, otp)
        if(verify){
            await UserService.updateEmailVerified(user_id)
            const token = jwt.sign(
                { user_id: user_id},
                process.env.APP_KEY,
                {
                    expiresIn: "3m",
                }
            );
            return res.status(200).send({
                status: 'success',
                status_code: 200,
                message: 'OTP verified. Now you can login to continue to dashboard.',
                token
            })
        }else{
            return res.status(401).send({
                status: 'error',
                status_code: 401,
                message: 'Invalid OTP'
            })
        }
    }catch (err) {
        return res.status(500).send({
            status: 'error',
            status_code: 500,
            message: err.message
        })
    }
}

const forgetPassword = async (req, res, next) => {
    try{
        return await UserService.forgetPassword(req, res);
    }catch (err) {
        return res.status(500).send({
            status: 'error',
            status_code: 500,
            message: err.message
        })
    }
}

const resetPassword = async (req, res, next) => {
    try{
        return await UserService.resetPassword(req, res)
    }catch (err) {
        return res.status(500).send({
            status: 'error',
            status_code: 500,
            message: err.message
        })
    }
}

module.exports = {
    register, login, verifyOtp, forgetPassword, resetPassword
}