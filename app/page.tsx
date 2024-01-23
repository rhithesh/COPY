"use client";
import Image from "next/image";
import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const socket = io("http://localhost:8080", {
	transports: ["websocket"],
});

export default function Home() {
	const [hello, setHello] = useState("");
	const [something, setSomething] = useState("");
	const [room, setRoom] = useState("");
	const router = useRouter();

	useEffect(() => {
		socket.connect();
		socket.on("connect", () => {
			console.log("connected");
		});
		socket.on("chat message", (message: string) => {
			console.log(message, "from web sockets");
			setSomething(message);
		});

		return () => {
			socket.disconnect();
			socket.off("join-room");
			socket.off("connect");
			socket.off("messagei");
		};
	}, [socket]);

	return (
		<main className="flex min-h-screen flex-col items-center justify-between">
			<div className="flex border-2 rounded-md">
				<div className="pt-2  font-light pb-3 pr-1 pl-2">https://copy/</div>
				<input
					onChange={(e) => {
						setRoom(e.target.value);
					}}
					className="  pl-1 italic  outline-none border-2"
				/>
				<button
					className="outline-none  bg-green-600 w-[50px]"
					onClick={() => {
						router.push("/" + room);
					}}>
					Go
				</button>
			</div>
		</main>
	);
}
