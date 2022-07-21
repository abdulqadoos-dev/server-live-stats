const GameService = require("./../services/GameService")

const getGameSocket = (socket) => {
	let interval;
	socket.on("request_game_data", async (data) => {
		const { gameId } = data;
		interval = setInterval(async () =>{
			const game = await GameService.find(gameId);
			emitGameData(socket, game);
		}, 3000)
	});

	socket.on("disconnect", () => {
		console.log("Client disconnected");
		clearInterval(interval);
	});
};

const emitGameData = (socket, game) => {
	socket.emit("get_game_data", { game, socketId: socket.id, time: new Date().getTime() });
};

module.exports = {
	getGameSocket,
};
