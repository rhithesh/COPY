"use client";
import Image from "next/image";
import { io } from "socket.io-client";
import { useState } from "react";

export default function Home() {
	const socket = io("http://localhost:8080");
	console.log(socket.connected);
	// socket.connect();
	// socket.on("connection", () => {
	// 	console.log("Connected to the server!");
	// });

	const [hello, setHello] = useState("hello");
	socket.on("connect", () => {
		console.log(socket.id);
	});
	//socket.emit("message", "hello", "hi	there");
	socket.on("reaction", (data) => {
		console.log(data);
		setHello(data);
	});
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<h1>
				my name is hithesh {socket.id}
				<span className=" border-2">{hello}</span> k{" "}
			</h1>
			<input
				onChange={(e) => {
					setHello(e.target.value);
				}}
			/>

			<button
				onClick={() => {
					socket.emit("message", hello, "hi	there");
				}}>
				emitting something
			</button>
		</main>
	);
}
