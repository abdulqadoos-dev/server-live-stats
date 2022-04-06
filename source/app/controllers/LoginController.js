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
                message: 'success',
                data: {
                    user,
                    token: token,
                    expiresIn: '2h'
                }
            })
        }
        return res.status(401).send({
            status: 'error',
            message: 'Invalid credentials',
            data: {}
        })

    }catch (err) {
        return res.status(500).send({
            status: 'error',
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
            return res.status(200).send({
                status: 'success',
                message: 'OTP verified. Now you can login to continue to dashboard.'
            })
        }else{
            return res.status(401).send({
                status: 'error',
                message: 'Invalid OTP'
            })
        }
    }catch (err) {
        return res.status(500).send({
            status: 'error',
            message: err.message
        })
    }
}

module.exports = {
    register, login, verifyOtp
}