const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	},
});
const port = process.env.PORT || 8080;
const cors = require("cors");
app.use(cors());
app.get("/", function (req, res) {});

// io.on("connection", (socket) => {
// 	console.log("user connected");
// 	socket.on("disconnect", function () {
// 		console.log("user disconnected");
// 	});
// });

io.on("connect", (socket) => {
	socket.on("message", (a, b, c) => {
		console.log(a, b, c);
	});
	socket.on("disconnect", function () {});
	io.emit("reaction", "Hello");
});

server.listen(port, function () {
	console.log(`Listening on port ${port}`);
});
