import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import {
    apiAuthPrefix,
    authRoutes,
    DEFAULT_LOGIN_REDIRECT,
    publicRoutes,
} from "./routes";
import { cleanEnv } from "./lib/env";

function getCanonicalHost() {
    const rawUrl = process.env.NEXTAUTH_URL;
    if (!rawUrl) return null;

    try {
        return new URL(rawUrl).host;
    } catch {
        return null;
    }
}

export async function middleware(req: NextRequest) {
    const canonicalHost = getCanonicalHost();
    const cookieHeader = req.headers.get("cookie") ?? "";
    const cookieNames = cookieHeader
        .split(";")
        .map((cookie) => cookie.trim().split("=")[0])
        .filter(Boolean);

    if (
        canonicalHost &&
        req.nextUrl.host !== canonicalHost &&
        (req.nextUrl.pathname.startsWith(apiAuthPrefix) || authRoutes.includes(req.nextUrl.pathname))
    ) {
        const redirectUrl = req.nextUrl.clone();
        redirectUrl.host = canonicalHost;
        redirectUrl.protocol = "https:";
        console.log("[middleware][host-redirect]", {
            path: req.nextUrl.pathname,
            from: req.nextUrl.host,
            to: canonicalHost,
        });
        return NextResponse.redirect(redirectUrl);
    }

    console.log("[middleware][cookie-state]", {
        path: req.nextUrl.pathname,
        host: req.nextUrl.host,
        hasCookieHeader: Boolean(cookieHeader),
        cookieNames,
        hasSessionCookie:
            cookieNames.some((name) =>
                [
                    "authjs.session-token",
                    "__Secure-authjs.session-token",
                    "next-auth.session-token",
                    "__Secure-next-auth.session-token",
                ].includes(name),
            ),
    });

    const token = await getToken({
        req,
        secret: cleanEnv(process.env.AUTH_SECRET),
    });

    console.log("[middleware][auth-state]", {
        path: req.nextUrl.pathname,
        host: req.nextUrl.host,
        loggedIn: Boolean(token),
        tokenSub: token?.sub ?? null,
    });

    const { nextUrl } = req;
    const isLoggedIn = Boolean(token);

    if (nextUrl.pathname.startsWith(apiAuthPrefix)) {
        return NextResponse.next();
    }

    if (authRoutes.includes(nextUrl.pathname)) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return NextResponse.next();
    }

    if (publicRoutes.includes(nextUrl.pathname)) {
        return NextResponse.next();
    }

    if (!isLoggedIn) {
        return NextResponse.redirect(new URL("/auth/sign-in", nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};