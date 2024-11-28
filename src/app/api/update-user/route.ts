import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { getTokenData } from "@/app/helpers/getTokenData";

export async function PATCH(request: NextRequest) {
    const userID = (await getTokenData(request)) as string;
    try {
        const body = await request.json();
        const { name } = body;

        // Check if required fields are provided
        if (!name) {
            return NextResponse.json(
                { message: "Missing required fields", success: false },
                { status: 400 }
            );
        }

        const updatedUser = await prisma.user.update({
            data: { name },
            where: { id: userID },
        });

        if (!updatedUser) {
            return NextResponse.json(
                {
                    message: "Failed to update user details",
                    success: false,
                },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                message: "User details updated successfully",
                data: updatedUser,
                success: true,
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                message: error.message || "Internal Server Error",
                success: false,
            },
            { status: 500 }
        );
    }
}
