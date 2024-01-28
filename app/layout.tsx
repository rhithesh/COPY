import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "COPPYY",
	description: "no email no whatsapp A link",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={` bg-black ${inter.className}`}>
				<div className="flex  w-screen  fixed p-3  hover:scale-98  bg-gradient-to-r   from-black  to-slate-500  rounded-md  gap-3  shadow-md">
					<span className="  text-3xl hover:scale-105  text-red-900  font-black">
						<Link href="http://localhost:3000/">COPY</Link>
					</span>
					<span className="pt-3 font-medium hover:underline">You can copy</span>
				</div>

				{children}
				<div className="flex   bg-black  h-[70vh] rounded-md  gap-3  shadow-md">
					<Accordion
						type="single"
						collapsible
						orientation="horizontal"
						className="w-full   basis-full ">
						<AccordionItem value="item-1" className=" basis-1/3 rounded-md  ">
							<AccordionTrigger className=" text-white text-2xl	   ">
								Is this use full
							</AccordionTrigger>
							<AccordionContent className="text-white">
								Well, let me consult my crystal ball... Oh wait, I dont have
								one. Okay, let me check my imaginary Usefulness-o-Meter. *beep
								boop beep* The results are in! It says, As useful as a chocolate
								teapot in a sauna. So, there you have it make of that what you
								will!
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-3" className=" rounded-md basis-1/3">
							<AccordionTrigger className=" text-white text-2xl">
								Nepotizm in India
							</AccordionTrigger>
							<AccordionContent className="text-white">
								njnfjkbwekjfb ljwfnjbfkjwebfjleb welkfnlekwjnfjkewnf jfenkjwebf
								jbfwejkfbjewk jweflejkfblew jlwnfeljewbfkje lwjenflkjewnjlwek
								jwbfjkewb kwfjbjkewfb klwnfljkewn ljnwfejleb ljnbewfkjbejk
								bjwefjkwebfjk wljenfkjwebfkjew jnefwkjbekjwfb jkbewfkjbfe
								jwebfnkjewbfke jkwefbjkfwb ekqjfbekwjbfwkjbf wjkefbkejwbfk
								wkejfbkjwebfkej jkbewfkjfbekjw jwbefkkjwebfkje
								ekhfbwkhebfekwjhbf kjwefbjkewbfek jkfewbkjwebfewkj
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-4" className=" rounded-md   ">
							<AccordionTrigger className=" text-white    text-2xl ">
								Is it accessible?
							</AccordionTrigger>
							<AccordionContent className="text-white">
								Yes. It adheres to the WAI-ARIA design pattern.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-5" className=" basis-1/3 rounded-md">
							<AccordionTrigger className=" text-white text-2xl">
								Is it styled?
							</AccordionTrigger>
							<AccordionContent className="text-white item-6 ">
								Yes. It comes with default styles that matches the other
								components&apos; aesthetic.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value=" item-7" className=" rounded-md basis-1/3">
							<AccordionTrigger className=" text-white text-2xl">
								Is it animated?
							</AccordionTrigger>
							<AccordionContent className="text-white">
								Yes. It&apos;s animated by default, but you can disable it if
								you prefer.
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>
			</body>
		</html>
	);
}
