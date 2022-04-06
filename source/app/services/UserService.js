const UserModal = require("../models/User");
const OptService = require("./OptService")
const dateTime = require('./HelperService').getDate()
const create = async (req, res) => {
    const {name, email, password, phone} = req.body
    if((await UserModal.findByEmail(email))?.id){
        return res.status(401).send({
            status: 'error',
            message: 'email already taken',
        })
    }
    const response = await UserModal.create({name, email, password, phone})
    const otp = await OptService.generateOtp(response.id)
    OptService.sendOtp(otp, email)
    return res.status(200).send({
        status: 'success',
        message: 'Otp has been sent to your email.',
        data: response
    })
}

const updateEmailVerified = async (id) => {
    await UserModal.update({id}, {emailVerifiedAt:dateTime});
}

module.exports = {
    create, updateEmailVerified
}