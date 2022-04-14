const LoginResponse = ({user, token}) => {
    return {
        message: 'Login successfully',
        user,
        token,
        expiresIn: '2h'
    }
}

module.exports = LoginResponse
