const LoginResponse = ({user, token, profile}) => {
    user = filterUserResponse(user, profile)
    return {
        message: 'Login successfully',
        user,
        token,
        expiresIn: '2h'
    }
}

const filterUserResponse = (user, profile) => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        roleId: user.roleId,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        profile
    }
}

module.exports = LoginResponse
