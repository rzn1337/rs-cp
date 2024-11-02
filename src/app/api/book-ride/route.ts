import { getTokenData } from "@/app/helpers/getTokenData";
import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { rideID } = body;

        console.log("rideID", rideID);

        const userID = (await getTokenData(request)) as string;

        const existingBooking = await prisma.booking.findUnique({
            where: {
                userID_rideID: { userID, rideID },
            },
        });

        if (existingBooking) {
            return NextResponse.json(
                {
                    message: "Booking already exists",
                    success: false,
                },
                { status: 409 }
            );
        }

        const booking = await prisma.booking.create({
            data: { rideID, userID },
        });

        if (!booking) {
            return NextResponse.json(
                {
                    message: "Failed to create ride booking",
                    success: false,
                },
                { status: 500 }
            );
        }

        const response = NextResponse.json({
            message: "Ride booked successfully",
            data: booking,
            success: true,
        });

        return response;
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
