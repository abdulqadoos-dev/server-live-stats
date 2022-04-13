const UserModal = require("../models/User");
const OptService = require("./OptService")
const jwt = require("jsonwebtoken");
const dateTime = require('./HelperService').getDate()

const create = async (req, res) => {
    const {name, email, password, phone} = req.body
    if((await UserModal.findByEmail(email))?.id){
        return res.status(401).send({
            status: 'error',
            status_code: 401,
            message: 'Email already taken',
        })
    }
    const response = await UserModal.create({name, email, password, phone})
    const otp = await OptService.generateOtp(response.id)
    OptService.sendOtp(otp, email)
    return res.status(200).send({
        status: 'success',
        status_code: 200,
        message: 'Otp has been sent to your email.',
        user: response
    })
}

const updateEmailVerified = async (id) => {
    await UserModal.update({id}, {emailVerifiedAt:dateTime});
}

const forgetPassword = async (req, res) => {
    const {email} = req.body;
    const user = await UserModal.findByEmail(email);
    if(user){
        const otp = await OptService.generateOtp(user.id)
        OptService.sendOtp(otp, email)
        return res.status(200).send({
            status: 'success',
            status_code: 200,
            message: 'Otp has been sent to your email.',
            user
        })
    }
    return res.status(404).send({
        status: 'error',
        status_code: 404,
        message: 'Email does not exist.',
    })
}

const resetPassword = async (req, res) => {
    let signature = req.header('authorization');
    const {password} = req.body;
    if (!signature) {
        return res.status(400).send({
            status: 'error',
            status_code: 400,
            message: "A signature is required."
        });
    } else if(!password){
        return res.status(400).send({
            status: 'error',
            status_code: 400,
            message: "A password is required."
        });
    }
    signature = signature.split(" ")?.[1]
    let sigData = {};
    try{
        sigData = jwt.verify(signature, process.env.APP_KEY);
    }catch (err) {
        return res.status(401).send({
            status: 'error',
            status_code: 401,
            message: "Invalid signature"
        });
    }
    const {user_id} = sigData;
    await UserModal.update({id:user_id}, {password})
    return res.status(200).send({
        status: 'success',
        status_code: 200,
        message: 'Password reset successfully'
    })
}

module.exports = {
    create, updateEmailVerified, forgetPassword, resetPassword
}