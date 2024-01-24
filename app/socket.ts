import { io } from "socket.io-client";
export const socket = io(
	"http://ec2-13-53-175-42.eu-north-1.compute.amazonaws.com:8080",
	{
		transports: ["websocket"],
	},
);
