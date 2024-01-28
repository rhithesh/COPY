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
				<div className="flex   bg-black  h-[70vh] 	rounded-md  gap-3  shadow-md">
					<Accordion
						type="single"
						collapsible
						orientation="horizontal"
						className="w-full   basis-1/2  ">
						<AccordionItem value="item-1" className=" basis-1/3 rounded-md  ">
							<AccordionTrigger className=" text-white text-2xl	   ">
								Is this use full
							</AccordionTrigger>
							<AccordionContent className="text-white">
								Well, let me consult my crystal ball... Oh wait, I don't have
								one. Okay, let me check my imaginary "Usefulness-o-Meter." *beep
								boop beep* The results are in! It says, "As useful as a
								chocolate teapot in a sauna." So, there you have it – make of
								that what you will!
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-3" className=" rounded-md basis-1/3">
							<AccordionTrigger className=" text-white text-2xl">
								Nepotizm in India
							</AccordionTrigger>
							<AccordionContent className="text-white">
								Why did the job application in India bring a family photo album?
								Because they wanted to show their strong commitment to
								"Nepotism: The Family Edition"! In India, getting a job is like
								playing musical chairs – the music stops, and suddenly, your
								cousin is the one sitting in the CEO's chair! I asked my friend
								in India how he got his job. He said, "It's a family tradition.
								My dad had this job, my granddad had this job, and if my future
								kid doesn't get this job, I'll be very disappointed." I tried
								applying for a job in an Indian company. They asked for my
								resume, and I sent them my family tree. I haven't heard back,
								but I did get an invitation to their family reunion. In India,
								job interviews are more like family reunions. They ask you about
								your skills, but what they really want to know is, "Who's your
								uncle?" I heard the Indian version of LinkedIn is just a family
								photo album where you tag your relatives with job titles. You
								know you're in an Indian office when the boss says, "We believe
								in equal opportunities – equally favoring our relatives." I
								applied for a job in India, and they told me they have a strict
								policy against nepotism. Then they asked if I had any siblings,
								cousins, or distant relatives they should know about. In India,
								networking means attending family gatherings and hoping your
								cousin is the CEO of a successful company. Getting a job in
								India is like winning the lottery. Except, instead of numbers,
								you need to match your last name with the company owner's last
								name. Remember, in India, it's not about what you know, but who
								you're related to. It's not a job search; it's a family reunion
								with employment opportunities!
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
					<div className=" basis-1/2"></div>
					<div className=" basis-full"></div>
				</div>
			</body>
		</html>
	);
}
