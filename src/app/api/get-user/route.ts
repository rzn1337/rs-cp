import { getTokenData } from "@/app/helpers/getTokenData";
import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const userID = (await getTokenData(request)) as string;
        console.log(userID);
        const user = await prisma.user.findUnique({
            where: { id: userID },
            select: { id: true, email: true, username: true },
        });

        if (!user) {
            return NextResponse.json(
                {
                    message: "User doesnt exist",

                    success: false,
                },
                { status: 404 }
            );
        }

        const response = NextResponse.json({
            message: "User fetched successfully",
            data: user,
            success: true,
        });

        return response;
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
