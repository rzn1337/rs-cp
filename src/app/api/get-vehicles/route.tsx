import { getTokenData } from "@/app/helpers/getTokenData";
import prisma from "@/app/lib/prisma";
import { Vehicle } from "@/schema/vehicle";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const userID = (await getTokenData(request)) as string;

        const vehicles = await prisma.vehicle.findMany({
            where: {
                userID: { equals: userID },
            },
        });

        const response = NextResponse.json({
            message: "Vehicle registered successfully",
            data: vehicles,
            success: true,
        });

        return response;
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
