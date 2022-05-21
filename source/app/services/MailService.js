const axios = require('axios')
const {EMAILJS_SEND_EMAIL_API_URL} = require("./Constants");

const send = (to, subject, body, otp, from = null) => {
    const templateParams = {
        send_to_email: to,
        otp_code: otp
    }
    const requestData = {
        service_id: process.env.EMAILJS_SERVICE_ID,
        template_id: process.env.EMAILJS_TEMPLATE_ID_VERIFY_OTP,
        user_id: process.env.EMAILJS_PUBLIC_KEY,
        template_params: templateParams,
        accessToken: process.env.EMAILJS_PRIVATE_KEY
    }
    axios.post(EMAILJS_SEND_EMAIL_API_URL, requestData)
        .then(res => console.log('email sent'))
        .catch(err => console.log('email failed with error: ', err))
}

module.exports = {send}
