const GetAllPlayersResponse = (data) => {
    return {
        status: 'success',
        status_code: 200,
        total_records: data.length,
        players: data
    }
}

module.exports = GetAllPlayersResponse
