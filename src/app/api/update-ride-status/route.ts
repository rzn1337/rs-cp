import { getTokenData } from "@/app/helpers/getTokenData";
import prisma from "@/app/lib/prisma";
import { TableBody } from "@/components/ui/table";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
    const validStatuses = ["SCHEDULED", "COMPLETED", "ENROUTE", "CANCELLED"];

    try {
        const body = await request.json();
        const { rideID, status } = body;

        if (!validStatuses.includes(status)) {
            return NextResponse.json(
                { message: "Invalid status update" },
                { status: 400 }
            );
        }

        const ride = await prisma.ride.update({
            where: { id: rideID },
            data: { status },
        });

        if (!ride) {
            return NextResponse.json(
                {
                    message: "Error updating ride status",
                    success: false,
                },
                {
                    status: 500,
                }
            );
        }

        return NextResponse.json(
            {
                message: "Ride status updated successfully",
                data: ride,
                success: true,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
