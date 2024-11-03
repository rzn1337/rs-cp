import { getTokenData } from "@/app/helpers/getTokenData";
import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { from, to, vehicleID, fare, scheduledFor, date } = body;

        const driverID = (await getTokenData(request)) as string;

        console.log(from, to, vehicleID, fare, scheduledFor, date, driverID);

        const dateString = "2024-10-01";
        const timeString = "15:56";

        const isoDateTimeString = `${dateString}T${timeString}:00.000Z`;

        const dateISO = new Date(isoDateTimeString);

        const ride = await prisma.ride.create({
            data: {
                driverID,
                vehicleID,
                fare: parseFloat(fare),
                scheduledFor: dateISO,
                route: {
                    create: {
                        from,
                        to,
                    },
                },
            },
            include: {
                route: true,
                passengers: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                username: true,
                                name: true,
                                profileImage: true,
                            },
                        },
                    },
                },
            },
        });

        console.log("ride", ride);

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

        return NextResponse.json(
            {
                message: "Ride created successfully",
                data: ride,
                success: false,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
