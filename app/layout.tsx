import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
			<body className={inter.className}>
				<div className="flex  w-screen  fixed p-3  hover:scale-98 bg-yellow-100 rounded-md  gap-3 border-2">
					<span className="  text-3xl hover:scale-105  text-red-900  font-black">
						Copy
					</span>
					<span className="pt-3 font-medium hover:underline">You can copy</span>
				</div>

				{children}
				<h1>hello</h1>
			</body>
		</html>
	);
}
