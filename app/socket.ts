import { io } from "socket.io-client";
export const socket = io("https://copyserver1.onrender.com/", {
	transports: ["websocket"],
});
