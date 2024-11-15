import { getTokenData } from "@/app/helpers/getTokenData";
import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { rideID } = body;

    try {
        const userID = (await getTokenData(request)) as string;

        const bookings = await prisma.booking.findMany({
            where: { userID },
            include: { ride: { include: { route: true } } },
        });

        await prisma.booking.delete({
            where: {
                userID_rideID: { userID, rideID },
            },
        });

        console.log(bookings);

        const response = NextResponse.json(
            {
                message: "Booking cancelled successfully",
                success: true,
            },
            { status: 200 }
        );

        return response;
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
