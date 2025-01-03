import { getTokenData } from "@/app/helpers/getTokenData";
import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const userID = (await getTokenData(request)) as string;

        const vehicles = await prisma.vehicle.findMany({
            where: {
                userID: { equals: userID },
            },
            include: { seats: true },
        });

        const response = NextResponse.json({
            message: "Vehicles fetched successfully",
            data: vehicles,
            success: true,
        });

        return response;
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
