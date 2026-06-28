import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import {
    apiAuthPrefix,
    authRoutes,
    DEFAULT_LOGIN_REDIRECT,
    publicRoutes,
} from "./routes";

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
        // host redirect for canonical NEXTAUTH_URL
        return NextResponse.redirect(redirectUrl);
    }

    // cookie-state logged for debug during development

    const token = await getToken({
        req,
        secret: process.env.AUTH_SECRET,
        cookieName: process.env.NODE_ENV === "production" 
            ? "__Secure-authjs.session-token" 
            : "authjs.session-token",
    });

    // auth-state: token check performed; no verbose logging in production

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