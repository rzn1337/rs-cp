import { getTokenData } from "@/app/helpers/getTokenData";
import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const activeUsersCount = await prisma.user.count();
        const oneDayAgo = new Date();
        oneDayAgo.setDate(oneDayAgo.getDate() - 1);
        const newUsersCount = await prisma.user.count({
            where: { createdAt: { gte: oneDayAgo } },
        });
        const totalRidesCount = await prisma.user.count();

        const response = NextResponse.json({
            message: "Admin statistics fetched successfully",
            data: { activeUsersCount, newUsersCount, totalRidesCount },
            success: true,
        });

        return response;
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
