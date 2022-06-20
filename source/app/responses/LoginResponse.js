const LoginResponse = ({user, token}) => {
    user = filterUserResponse(user)
    return {
        message: 'Login successfully',
        user,
        token,
        expiresIn: '2h'
    }
}

const filterUserResponse = (user) => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        roleId: user.roleId,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        image: user.image,
        profile:user.profile || user.team
    }
}

module.exports = LoginResponse
