const LoginResponse = ({user, token}) => {
    return {
        status: 'success',
        status_code: 200,
        message: 'success',
        user,
        token,
        expiresIn: '2h'
    }
}

module.exports = LoginResponse
