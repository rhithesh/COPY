"use client";
import { useEffect, useState, useRef } from "react";
import { useClipboard } from "use-clipboard-copy";
import { Button } from "@/components/Button";
import { io } from "socket.io-client";
const socket = io("https://copyserver1.onrender.com", {
	transports: ["websocket"],
});

export default function Page({ params }: { params: { slug: string } }) {
	const [something, setSomething] = useState("");
	const clipboard = useClipboard();
	const isSocketConnected = useRef(false);

	useEffect(() => {
		if (!isSocketConnected.current) {
			socket.connect();
			socket.on("connect", () => {
				console.log("connected");
				isSocketConnected.current = true;
			});
			socket.on("chat message", (message: string) => {
				console.log(message, "from web sockets");
				setSomething(message);
			});
		}

		return () => {
			socket.disconnect();
			socket.off("join-room");
			socket.off("connect");
			socket.off("chat message");
		};
	}, []);

	useEffect(() => {
		console.log("rerenders2");
		const headers = new Headers();
		headers.append("Content-Type", "application/json");
		headers.append("checker", params.slug);
		console.log(headers);
		fetch("https://copying-theta.vercel.app/api", {
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
		<main className="flex min-h-screen flex-col pt-11 ">
			<Button
				className="mr-auto ml-2 my-2 shadow-lg bg-green-400  rounded-md  hover:bg-green-600 p-2  font-semibold"
				onClick={clipboard.copy}>
				copy link
			</Button>
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
