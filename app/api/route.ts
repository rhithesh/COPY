import { Redis } from "@upstash/redis";

const redis = new Redis({
	url: "https://apn1-equipped-grub-34450.upstash.io",
	token:
		"AYaSASQgMzE1MzM3MWItNDYzMi00ZjU2LWJiOTEtNjk3OTkyNDJmMTlhMTkxZmNmY2RhMDZlNGNmMDhmYjZkODZiMzhmZmZmYTU=",
});

export const dynamic = "force-dynamic"; // defaults to auto
interface CustomHeaders extends Headers {
	checker: string;
}

export async function POST(request: Request) {
	const requestBody = await request.json(); // or request.json() for JSON content
	console.log(typeof requestBody);
	console.log(requestBody.hello);

	const exists = await redis.exists(requestBody.hello);
	console.log(exists);
	if (!exists) {
		const value = await redis.set(requestBody.hello, "");

		return Response.json({ newvalue: "newvalueset" });
	} else {
		const value = await redis.get(requestBody.hello);
		console.log(value, "jjj");
		return Response.json({ value: value });
	}
}

export async function GET(request: Request) {
	return Response.json({ value: "all good" });
}
