const ForbiddenResponse = (msg) => {
    return {
        status: 'error',
        status_code: 403,
        message: msg
    }
}

module.exports = ForbiddenResponse