import { getTokenData } from "@/app/helpers/getTokenData";
import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const userID = (await getTokenData(request)) as string;

        const bookings = await prisma.booking.findMany({
            where: { userID },
            include: { ride: { include: { route: true } } },
        });

        const rides = await prisma.ride.findMany({
            where: { driverID: { not: userID }, bookings: {some: {userID}} },
        });

        console.log(bookings);

        const response = NextResponse.json({
            message: "Use rides fetched successfully",
            data: rides,
            success: true,
        });

        return response;
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
