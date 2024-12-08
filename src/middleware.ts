import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const isPublicPath =
        path === "/sign-in" || path === "/sign-up" || path === "/";

    const token = request.cookies.get("token")?.value || "";
    if (token) {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
        const { payload } = await jose.jwtVerify(token, secret);

        console.log("token", payload);
        if (path === "/admin" && payload.role !== "ADMIN") {
            return NextResponse.redirect(new URL("/unauthorized", request.url));
        }
        if (payload.status !== "ACTIVE") {
            return NextResponse.redirect(new URL("/unauthorized", request.url));
        }
    }

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        "/",
        "/sign-in",
        "/sign-up",
        "/dashboard",
        "/admin",
        "/rides",
        "/profile",
        "/admin",
    ],
};
