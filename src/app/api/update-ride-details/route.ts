import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, scheduledFor, from, to } = body;

        // Check if required fields are provided
        if (!id || !scheduledFor || !from || !to) {
            return NextResponse.json(
                { message: "Missing required fields", success: false },
                { status: 400 }
            );
        }

        // const scheduledFor = new Date(`${date}T${time}:00`);

        // if (isNaN(scheduledFor.getTime())) {
        //     return NextResponse.json(
        //         { message: "Invalid date or time format", success: false },
        //         { status: 400 }
        //     );
        // }

        // Update ride details in the database
        const ride = await prisma.ride.update({
            where: { id },
            data: {
                scheduledFor,
                route: { update: { to, from } },
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

        if (!ride) {
            return NextResponse.json(
                {
                    message: "Ride not found or could not be updated",
                    success: false,
                },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                message: "Ride details updated successfully",
                data: ride,
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
