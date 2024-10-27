import prisma from "@/app/lib/prisma";
import bcrypt from "bcryptjs";
import * as jose from "jose";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { username, password } = body;

        const user = await prisma.user.findUnique({
            where: { username: username },
        });

        if (!user) {
            return Response.json(
                { error: "User does not exist" },
                { status: 400 }
            );
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return Response.json(
                { error: "Incorrect credentials" },
                { status: 400 }
            );
        }

        const tokenPayload = {
            id: user,
            username: user,
            email: user,
        };

        const secret = new TextEncoder().encode(process.env.JWT_SECRET);

        const token = await new jose.SignJWT(tokenPayload)
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("1h")
            .sign(secret);

        const response = NextResponse.json({
            message: "Login Successful",
            success: true,
        });

        response.cookies.set("token", token, {
            httpOnly: true,
        });

        return response;
    } catch (error) {
        return Response.json({ error: error }, { status: 500 });
    }
}
