const ExceptionResponse = (msg) => {
    return {
        status: 'error',
        status_code: 500,
        message: msg
    }
}

module.exports = ExceptionResponse
