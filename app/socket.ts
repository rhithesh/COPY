import { io } from "socket.io-client";
export const socket = io("https://workers-y4zp.onrender.com:8080", {
	transports: ["websocket"],
});
