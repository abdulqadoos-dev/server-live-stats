const GetAllSportsResponse = (data) => {
    return {
        status: 'success',
        status_code: 200,
        total_records: data.length,
        sports: data
    }
}

module.exports = GetAllSportsResponse