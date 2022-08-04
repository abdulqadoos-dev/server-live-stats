const GameService = require("./../services/GameService")
const MatchService = require("./../services/MatchService")

const getGameSocket = (socket) => {
	let interval;
	socket.on("request_game_data", async (data) => {
		const { gameId } = data;
		interval = setInterval(async () =>{
			const match = await MatchService.getByGameId(gameId);
			emitGameData(socket, match);
		}, 3000)
	});

	socket.on("disconnect", () => {
		console.log("Client disconnected");
		clearInterval(interval);
	});
};

const emitGameData = (socket, match) => {
	socket.emit("get_game_data", { match, socketId: socket.id, time: new Date().getTime() });
};

module.exports = {
	getGameSocket,
};
