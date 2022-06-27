module.exports = (data) => {
    return {
        status: 'success',
        status_code: 200,
        message: 'Match info saved successfully',
        match: data
    }
}
