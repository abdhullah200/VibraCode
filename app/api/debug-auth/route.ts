import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

import { cleanEnv } from "@/lib/env";

export async function GET(req: NextRequest) {
	const cookieHeader = req.headers.get("cookie") ?? "";
	const cookieNames = cookieHeader
		.split(";")
		.map((cookie) => cookie.trim().split("=")[0])
		.filter(Boolean);

	const token = await getToken({
		req,
		secret: cleanEnv(process.env.AUTH_SECRET),
	});

	const payload = {
		hasCookieHeader: Boolean(cookieHeader),
		cookieNames,
		hasSessionCookie: cookieNames.some((name) =>
			[
				"authjs.session-token",
				"__Secure-authjs.session-token",
				"next-auth.session-token",
				"__Secure-next-auth.session-token",
			].includes(name),
		),
		hasToken: Boolean(token),
		tokenSub: token?.sub ?? null,
		tokenRole: token?.role ?? null,
		host: req.nextUrl.host,
		path: req.nextUrl.pathname,
	};

	return Response.json(payload, { status: 200 });
}
