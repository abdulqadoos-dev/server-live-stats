const VerifyOtpResponse = ({token}) => {
    return {
        status: 'success',
        status_code: 200,
        message: 'OTP verified. Now you can login to continue to dashboard.',
        token
    }
}

module.exports = VerifyOtpResponse
