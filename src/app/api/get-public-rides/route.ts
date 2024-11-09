import { getTokenData } from "@/app/helpers/getTokenData";
import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        //     const params = request.nextUrl.searchParams;
        //     const searchTerm = params.get("search")!;
        //     const limit = params.get("limit")!;

        const userID = (await getTokenData(request)) as string;

        //     const where = searchTerm
        //         ? {
        //               OR: [
        //                   { to: { contains: searchTerm, mode: "insensitive" } },
        //                   { from: { contains: searchTerm, mode: "insensitive" } },
        //               ],
        //               ride: {
        //                   status: "SCHEDULED",
        //                   driverID: { not: userID },
        //                   passengers: {
        //                       none: {
        //                           userID: userID, // Exclude rides the user has already booked
        //                       },
        //                   },
        //               },
        //           }
        //         : {
        //               ride: {
        //                   status: "SCHEDULED",
        //                   driverID: { not: userID },
        //                   passengers: {
        //                       none: {
        //                           userID: userID, // Exclude rides the user has already booked
        //                       },
        //                   },
        //               },
        //           };

        //     const rides = await prisma.route.findMany({
        //         where,
        //         take: parseInt(limit, 10),
        //         include: {
        //             ride: {
        //                 include: {
        //                     driver: true,
        //                     vehicle: {
        //                         include: { seats: true },
        //                     },
        //                     passengers: true,
        //                 },
        //             },
        //         },
        //         orderBy: {
        //             ride: {
        //                 createdAt: "desc",
        //             },
        //         },
        //     });

        const rides = await prisma.ride.findMany({
            where: { driverID: { not: userID },  status: "SCHEDULED", bookings: {none: {
                userID: userID
            }}},
            select: {
                id: true,
                driver: {
                    select: {
                        id: true,
                        username: true,
                    },
                },
                vehicle: {
                    select: {
                        id: true,
                        make: true,
                        model: true,
                        year: true,
                        type: true,
                        seats: {
                            select: {
                                id: true,
                                seatNumber: true,
                                isPremium: true,
                            },
                        },
                    },
                },
                fare: true,
                premiumFare: true,
                scheduledFor: true,
                bookings: {
                    select: { seat: true },
                },
                route: { select: { id: true, to: true, from: true } },
            },
            take: 10,
            orderBy: {
                createdAt: "desc",
            },
        });

        const response = NextResponse.json({
            message: "Created rides fetched successfully",
            data: rides,
            success: true,
        });

        return response;
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
