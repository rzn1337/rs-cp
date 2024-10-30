import { getTokenData } from "@/app/helpers/getTokenData";
import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { from, to, vehicleID, fare, scheduledFor, date } = body;

        const driverID = (await getTokenData(request)) as string;

        const ride = await prisma.ride.create({
            data: {
                driverID,
                vehicleID,
                fare: parseFloat(fare),
                scheduledFor,
                date,
                route: {
                    create: {
                        from,
                        to,
                    },
                },
            },
            include: {
                route: true, // Include route data if you want it in the response
            },
        });

        if (!ride) {
            return NextResponse.json(
                {
                    message: "Error creating ride",
                    success: false,
                },
                {
                    status: 500,
                }
            );
        }

        const response = NextResponse.json({
            message: "Ride created successfully",
            data: ride,
            success: true,
        });

        return response;
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
