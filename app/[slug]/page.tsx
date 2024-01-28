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
	const [noTextarea, setnoTextarea] = useState([""]);
	const [Textcont, setTextcont] = useState([""]);

	useEffect(() => {
		if (!isSocketConnected.current) {
			socket.connect();
			socket.on("connect", () => {
				console.log("connected");
				isSocketConnected.current = true;
			});
			socket.on("chat message", (message) => {
				console.log("message coming from socket", typeof message);
				if (typeof message.message == "string") {
					socket.emit("chat message", {
						room: params.slug,
						message: [""],
					});
					setnoTextarea([""]);
					setTextcont([""]);
				} else {
					setnoTextarea(message.message);
					setTextcont(message.message);
				}
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
				socket.emit("join-room", params.slug);
				setnoTextarea(t.value);
				setTextcont(t.value);
			});
	}, []);

	return (
		<main className="flex min-h-screen  flex-col pt-20  ">
			<div>
				<div className=" justify-center items-center flex">
					<Button
						disabled
						className=" ml-2 my-2 shadow-lg bg-green-400  rounded-md  hover:bg-green-600 p-2   font-semibold"
						onClick={clipboard.copy}>
						copy
					</Button>
					<Button
						className=" ml-2 my-2 shadow-lg bg-green-400  rounded-md  hover:bg-green-600 p-2  font-semibold"
						onClick={(e) => {
							setnoTextarea([...noTextarea, ""]);
							console.log("clicked", noTextarea);
						}}>
						ADD
					</Button>
					<Button
						className=" ml-2 my-2 shadow-lg bg-green-400  rounded-md  hover:bg-green-600 p-2  font-semibold"
						onClick={(e) => {
							setnoTextarea(noTextarea.slice(0, -1));
							setTextcont(Textcont.slice(0, -1));
							socket.emit("join-room", params.slug);
						}}>
						REMOVE
					</Button>
					<Button className="  p-2 rounded-xl ml-7">
						{noTextarea?.length}
					</Button>
					<h1 className="  text-white pl-3 text-2xl font-semibold">
						Copy button is yet to be implemented use
						<span className=" pl-5 pr-6 mx-3 bg-blue-500 rounded-md">
							{" "}
							ctrl+a
						</span>
					</h1>
				</div>

				<div className="  mx-auto     w-[88%]  flex   min-h-screen  gap-2 justify-between  flex-wrap  ">
					{Array.isArray(noTextarea)
						? noTextarea?.map((t, i) => {
								return (
									<textarea
										key={i}
										value={Textcont[i]}
										onChange={(e) => {
											const b = [...Textcont];
											b[i] = e.target.value;
											setTextcont(b);
											socket.emit("chat message", {
												room: params.slug,
												message: b,
											});
										}}
										className={`border-2  px-2 py-2  basis-full  my-5 rounded-xl  	bg-black text-white ${
											noTextarea.length == 1
												? "md:basis-[100%]  h-screen "
												: noTextarea.length == 2
												? "md:basis-[49%]  min-h-screen"
												: noTextarea.length > 2
												? " md:basis-[49%]   h-screen  "
												: "md:basis-[49%]  h-screen "
										} `}
									/>
								);
						  })
						: ""}
				</div>
			</div>
		</main>
	);
}
