import { getTokenData } from "@/app/helpers/getTokenData";
import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const userID = (await getTokenData(request)) as string;
        console.log(userID);
        const createdRides = await prisma.ride.findMany({
            where: { driverID: userID },
            include: {
                route: true,
                bookings: {
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

        console.log(createdRides.length)

        // if (createdRides.length <= 0) {
        //     return NextResponse.json(
        //         {
        //             message: "Couldnt fetch rides",

        //             success: false,
        //         },
        //         { status: 500 }
        //     );
        // }

        const response = NextResponse.json({
            message: "Created rides fetched successfully",
            data: createdRides,
            success: true,
        });

        return response;
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
