import { getTokenData } from "@/app/helpers/getTokenData";
import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const userID = (await getTokenData(request)) as string;

        const users = await prisma.user.findMany({
            where: { id: { not: userID } },
        });

        const response = NextResponse.json({
            message: "All users fetched successfully",
            data: users,
            success: true,
        });

        return response;
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
