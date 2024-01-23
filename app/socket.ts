import { io } from "socket.io-client";
export const socket = io("https://copy-rouge.vercel.app", {
	transports: ["websocket"],
});
