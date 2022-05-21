const MailService = require('./MailService')
const modelInstance = require('./../models/index')
const OtpModel = modelInstance.otp;

const generateOtp = async (userId) => {
    const otp = require('./HelperService').randomIntGenerator(100000,999999);
    await OtpModel.destroy({where:{userId}})
    await OtpModel.create({userId: userId, code: otp})
    return otp
}

const sendOtp = (otp, email) => {
    const subject = 'Verify OTP'
    const body = `<div>Here is your otp: <b>${otp}</b></div>`;
    MailService.send(email, subject, body, otp)
}

const verifyOtp = async (userId, otp) => {
    const verify = await OtpModel.findAll({where: {userId, code: otp}})
    if(verify?.length > 0){
        /**
         * delete otp
         */
        await OtpModel.destroy({where:{userId}})
        return true;
    }
    return false;
}

module.exports = { generateOtp, sendOtp, verifyOtp}