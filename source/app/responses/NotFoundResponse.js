const NotFoundResponse = (msg) => {
    return {
        status: 'error',
        status_code: 404,
        message: msg
    }
}

module.exports = NotFoundResponse