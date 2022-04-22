const UserModal = require("../models/User");
const OptService = require("./OptService")
const jwt = require("jsonwebtoken");
const dateTime = require('./HelperService').getDate()
const UnauthorizedResponse = require('./../responses/UnauthorizedResponse')
const BadRequestResponse = require('./../responses/BadRequestResponse')
const NotFoundResponse = require('./../responses/NotFoundResponse')
const ForbiddenResponse = require('./../responses/ForbiddenResponse')
const RegisterResponse = require('./../responses/RegisterResponse')
const SuccessResponse = require('./../responses/SuccessResponse')

const create = async (req, res) => {
    const { name, email, password, phone } = req.body
    if ((await UserModal.findByEmail(email))?.id) {
        return res.status(400).send({ validationResults: { email: "Email already taken" } })
    }
    const response = await UserModal.create({ name, email, password, phone })
    const otp = await OptService.generateOtp(response.id)
    OptService.sendOtp(otp, email)
    return res.status(200).send(RegisterResponse({ user: response }))
}

const updateEmailVerified = async (id) => {
    await UserModal.update({ id }, { emailVerifiedAt: dateTime });
}

const forgetPassword = async (req, res) => {
    const { email } = req.body;
    const user = await UserModal.findByEmail(email);
    if (user) {
        const otp = await OptService.generateOtp(user.id)
        OptService.sendOtp(otp, email)
        return res.status(200).send(RegisterResponse({ user }))
    }
    return res.status(400).send({ validationResults: { email: "Email does not exist" } })
}

const resetPassword = async (req, res) => {
    let signature = req.header('authorization');
    const { password } = req.body;
    if (!signature) {
        return res.status(403).send({ error: "Signature is required" });
    } else if (!password) {
        return res.status(400).send({ validationResults: { password: "Password is required" } });
    }
    signature = signature.split(" ")?.[1]
    let sigData = {};
    try {
        sigData = jwt.verify(signature, process.env.APP_KEY);
    } catch (err) {
        return res.status(403).send({ error: "Invalid signature" });
    }
    const { user_id } = sigData;
    await UserModal.update({ id: user_id }, { password })
    return res.status(200).send(SuccessResponse('Password reset successfully'))
}

module.exports = {
    create, updateEmailVerified, forgetPassword, resetPassword
}