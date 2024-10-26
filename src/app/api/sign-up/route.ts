import validateEmail from "@/app/helpers/validateEmail";
import validatePassword from "@/app/helpers/validatePassword";
import prisma from "@/app/lib/prisma";
import bcrypt from "bcryptjs";

/* eslint-disable @typescript-eslint/no-unused-vars */
export async function POST(request: Request) {
    const body = await request.json();
    const { username, email, password } = body;

    // validate email and password
    if (!validateEmail(email) || !validatePassword(password)) {
        return Response.json(
            { error: "Invalid email or password" },
            { status: 400 }
        );
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create a new user in the db
    const user = await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword,
        },
    });

    if (!user) {
        return Response.json(
            { error: "Error creating the user" },
            { status: 500 }
        );
    }

    return Response.json({ status: 200 });
}
