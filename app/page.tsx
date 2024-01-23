"use client";
import Image from "next/image";
import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import Link from "next/link";

const socket = io("https://copy-2vlc-4y32cy5l9-rhithesh.vercel.app", {
	transports: ["websocket"],
});

export default function Home() {
	const [hello, setHello] = useState("");
	const [something, setSomething] = useState("");
	const [room, setRoom] = useState("");
	const [stringt, setstringt] = useState<boolean>(false);
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

	function checkstring(str: string) {
		// Check if the stripped string is equal to the original string
		var a = str.trim();
		var c = a.includes(" ");

		console.log(c);

		if (!c) {
			setstringt(false);
		} else {
			setstringt(true);
		}
	}

	return (
		<main className="flex   h-[90vh]  border-2  content-center  items-center justify-center">
			<div className="flex flex-col">
				<div className="p-5">
					<svg xmlns="http://www.w3.org/2000/svg" width="200" height="50">
						<text
							x="110"
							y="40"
							fontFamily="Arial, sans-serif"
							fontSize="30"
							fill="black">
							COPY
						</text>
					</svg>
				</div>
				<div className="flex border-2 rounded-md   ">
					<div className="pt-2  font-light pb-3  bg-slate-400 pr-2 pl-2">
						https://copy/
					</div>
					<input
						onChange={(e) => {
							checkstring(e.target.value);
							setRoom(e.target.value);
						}}
						className=" pl-1 italic  font-light   ring-zinc-950"
					/>
					<Button
						disabled={stringt}
						className="outline-none  bg-green-600 w-[50px]"
						onClick={() => {
							router.push("/" + room);
						}}>
						Go
					</Button>
				</div>
				<div className="h-[100px] flex-col flex">
					{room && !stringt ? (
						<>
							<p>Click!!!</p>
							<Link
								className="  text-yellow-400	hover:text-yellow-500 "
								href={"http://localhost:3000/" + room}>
								{"https://copy/" + room}
							</Link>
						</>
					) : (
						""
					)}
					{stringt ? <p className="text-red-600 ">No space allowed</p> : ""}
				</div>
			</div>
		</main>
	);
}
