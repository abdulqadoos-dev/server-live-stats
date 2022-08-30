const socketIo = require("socket.io");
const { setIOGlobal } = require("../services/Global");
const GetGameDetailsSocket = require("./GetGameDetailsSocket")

const io = (server) =>
	socketIo(server, {
		cors: { origin: "*" },
	});

const connection = (io) => {
	io.on("connection", (socket) => {
		console.log("New client connected");
		setIOGlobal(io)
		socket.on("disconnect", () => {
			console.log("Client disconnected");
		});
        // GetGameDetailsSocket.getGameSocket(socket)
	});
};

module.exports = {
	io,
	connection,
};
