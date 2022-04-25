// const OptModel = require('./../models/Opt')
const MailService = require('./MailService')
const modelInstance = require('./../models/index')
const OtpModel = modelInstance.otps;

const generateOtp = async (user_id) => {
    const otp = require('./HelperService').randomIntGenerator(100000,999999);
    // await OptModel.deleteByUser(user_id)
    await OtpModel.destroy({where:{user_id}})
    // await OptModel.create(user_id, otp)
    await OtpModel.create({user_id: user_id, code: otp})
    return otp
}

const sendOtp = (otp, email) => {
    const subject = 'Verify OTP'
    const body = `<div>Here is your otp: <b>${otp}</b></div>`;
    MailService.send(email, subject, body)
}

const verifyOtp = async (user_id, otp) => {
    // const verify = await OptModel.verify(user_id, otp)
    const verify = await OtpModel.findAll({where: {user_id, code: otp}})
    if(verify?.length > 0){
        // delete otp
        // await OptModel.deleteByUser(user_id)
        await OtpModel.destroy({where:{user_id}})
        return true;
    }
    return false;
}

module.exports = { generateOtp, sendOtp, verifyOtp}