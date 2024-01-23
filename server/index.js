const app = require("express")();
const server = require("http").createServer(app);
const r = require("@upstash/redis");
const e = require("cors");
const Redis = r.Redis;
const io = require("socket.io")(server, {
	cors: {
		origin: ["http://localhost:3000", "https://copying-theta.vercel.app"],
		methods: ["GET", "POST"],
	},
});

const redis = new Redis({
	url: "https://apn1-equipped-grub-34450.upstash.io",
	token:
		"AYaSASQgMzE1MzM3MWItNDYzMi00ZjU2LWJiOTEtNjk3OTkyNDJmMTlhMTkxZmNmY2RhMDZlNGNmMDhmYjZkODZiMzhmZmZmYTU=",
});

const port = 8080;
const cors = require("cors");

app.use(cors());

app.get("/", async (req, res) => {
	return res.status(200).json({ message: "hello" });
});
app.post("/", async (req, res) => {
	console.log(req.headers.checker);
	console.log("request made");
	const exists = await redis.exists("foop");
	if (exists) {
		res.status(400).json({ error: "key already exists" });
	} else {
		const value = await redis.get(req.headers.checker);

		if (value) {
			res.status(200).json({ value: value });
		}
	}
});

const { customAlphabet } = require("nanoid/non-secure");

const numbersCharacterSet =
	"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const generateKey = customAlphabet(numbersCharacterSet, 5);

io.on("connect", (socket) => {
	socket.on("set", (room) => {
		socket.join(room);
		console.log("joined a room");
	});

	console.log(socket.id);
	socket.on("chat message", async (msg, room) => {
		io.to(room).emit("chat message", msg);
		const data = await redis.set(room, msg);
		console.log(data, "data");
	});

	socket.on("disconnect", () => {
		console.log("user disconnected");
	});
	socket.on("join-room", (room) => {
		socket.join(room);
		console.log("joined a room");
	});
});

server.listen(port, function () {
	console.log(`Listening on port ${port}`);
});
