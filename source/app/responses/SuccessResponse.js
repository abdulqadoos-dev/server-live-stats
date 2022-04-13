const SuccessResponse = (msg) => {
    return {
        status: 'success',
        status_code: 200,
        message: msg
    }
}

module.exports = SuccessResponse
