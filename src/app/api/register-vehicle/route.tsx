import { getTokenData } from "@/app/helpers/getTokenData";
import prisma from "@/app/lib/prisma";
import { Vehicle } from "@/schema/vehicle";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { make, model, year, licensePlate, seats } = body;

        const userID = (await getTokenData(request)) as string;

        const user = await prisma.user.findUnique({
            where: { id: userID },
        });

        if (!user) {
            return Response.json(
                { error: "User does not exist" },
                { status: 400 }
            );
        }

        const vehicle = await prisma.vehicle.create({
            data: {
                userID, // Set the foreign key relation
                make,
                model,
                year: parseInt(year, 10),
                licensePlate,
                seats: parseInt(seats, 10),
            },
        });

        const response = NextResponse.json({
            message: "Vehicle registered successfully",
            data: vehicle,
            success: true,
        });

        return response;
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
