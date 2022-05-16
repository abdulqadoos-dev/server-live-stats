module.exports = (data) => {
    return {
        status: 'success',
        status_code: 200,
        ...data
    }
}