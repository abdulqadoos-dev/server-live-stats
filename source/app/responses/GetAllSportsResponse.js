const GetAllSportsResponse = (data) => {
    return {
        status: 'success',
        status_code: 200,
        sports: data
    }
}

module.exports = GetAllSportsResponse
