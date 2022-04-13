const BadRequestResponse = (msg) => {
    return {
        status: 'error',
        status_code: 400,
        message: msg
    }
}

module.exports = BadRequestResponse