const socketIo = require("socket.io");
const GetGameDetailsSocket = require("./GetGameDetailsSocket")

const io = (server) =>
	socketIo(server, {
		cors: { origin: "*" },
	});

const connection = (io) => {
	io.on("connection", (socket) => {
		console.log("New client connected");
        GetGameDetailsSocket.getGameSocket(socket)
	});
};

module.exports = {
	io,
	connection,
};
