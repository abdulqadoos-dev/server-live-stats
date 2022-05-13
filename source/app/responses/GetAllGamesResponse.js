const GetAllGamesResponse = (data) => {
    return {
        status: 'success',
        status_code: 200,
        total_records: data.length,
        games: data
    }
}

module.exports = GetAllGamesResponse
