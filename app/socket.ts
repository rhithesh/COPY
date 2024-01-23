import { io } from "socket.io-client";
export const socket = io("https://copy-2vlc-4y32cy5l9-rhithesh.vercel.app", {
	transports: ["websocket"],
});
