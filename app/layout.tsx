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
				<div className="flex border-2">
					<span className="   text-red-900  font-black">Copy</span>
				</div>

				{children}
			</body>
		</html>
	);
}
