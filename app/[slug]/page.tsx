"use client";
import { useEffect, useState } from "react";
import { socket } from "../socket";
import { useClipboard } from "use-clipboard-copy";

export default function Page({ params }: { params: { slug: string } }) {
	const [something, setSomething] = useState("");
	const clipboard = useClipboard();

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
		<main className="flex min-h-screen flex-col ">
			<button
				className="mr-auto ml-2 my-2 bg-green-400 p-1 rounded-md  font-semibold"
				onClick={clipboard.copy}>
				copy
			</button>
			<textarea
				ref={clipboard.target}
				className="border-2 ml-2 min-h-screen w-screen"
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
