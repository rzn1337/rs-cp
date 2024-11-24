import { getTokenData } from "@/app/helpers/getTokenData";
import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const userID = (await getTokenData(request)) as string;

        const userData = await prisma.user.findUnique({
            where: { id: userID },
            include: {
                bookedRides: {
                    include: {
                        seat: true,
                        ride: { include: { route: true, vehicle: true } },
                    },
                },
                Vehicle: { include: { _count: { select: { seats: true } } } },
                complaintsAsComplainant: {include: {complainee: true}},
            },
        });

        if (!userData) {
            return NextResponse.json(
                {
                    message: "User doesnt exist",

                    success: false,
                },
                { status: 404 }
            );
        }

        const response = NextResponse.json({
            message: "User fetched successfully",
            data: userData,
            success: true,
        });

        return response;
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
