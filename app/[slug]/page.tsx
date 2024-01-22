"use client";
import { useEffect, useState } from "react";
import { socket } from "../socket";

export default function Page({ params }: { params: { slug: string } }) {
	const [something, setSomething] = useState("");

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

	useEffect(() => {
		const headers = new Headers();
		headers.append("Content-Type", "application/json");
		headers.append("checker", params.slug);
		console.log(headers);
		fetch("http://localhost:3000/api", {
			method: "POST",
			headers: headers,
			body: JSON.stringify({ hello: params.slug }),
		})
			.then((response) => {
				return response.json();
			})
			.then((t) => {
				console.log(t);
				socket.emit("join-room", params.slug);
				setSomething(t.value);
			});
	}, []);

	return (
		<main className="flex min-h-screen ">
			<textarea
				className="border-2 min-h-screen w-screen"
				value={something}
				onChange={(e) => {
					setSomething(e.target.value);
					socket.emit("chat message", e.target.value, params.slug);
				}}
			/>
			{/* <div className="border-2  border-blue-800 basis-1/2">{something}</div>
			</div> */}
		</main>
	);
}
