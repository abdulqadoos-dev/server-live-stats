const RegisterResponse = ({user}) => {
    return {
        status: 'success',
        status_code: 200,
        message: 'Otp has been sent to your email.',
        user
    }
}

module.exports = RegisterResponse
