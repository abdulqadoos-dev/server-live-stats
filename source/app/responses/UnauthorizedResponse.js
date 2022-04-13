const UnauthorizedResponse = (msg) => {
    return {
        status: 'error',
        status_code: 401,
        message: msg
    }
}

module.exports = UnauthorizedResponse
