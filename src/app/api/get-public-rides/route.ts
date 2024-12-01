// import { getTokenData } from "@/app/helpers/getTokenData";
// import prisma from "@/app/lib/prisma";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(request: NextRequest) {
//     try {
//         //     const params = request.nextUrl.searchParams;
//         //     const searchTerm = params.get("search")!;
//         //     const limit = params.get("limit")!;

//         const userID = (await getTokenData(request)) as string;

//         //     const where = searchTerm
//         //         ? {
//         //               OR: [
//         //                   { to: { contains: searchTerm, mode: "insensitive" } },
//         //                   { from: { contains: searchTerm, mode: "insensitive" } },
//         //               ],
//         //               ride: {
//         //                   status: "SCHEDULED",
//         //                   driverID: { not: userID },
//         //                   passengers: {
//         //                       none: {
//         //                           userID: userID, // Exclude rides the user has already booked
//         //                       },
//         //                   },
//         //               },
//         //           }
//         //         : {
//         //               ride: {
//         //                   status: "SCHEDULED",
//         //                   driverID: { not: userID },
//         //                   passengers: {
//         //                       none: {
//         //                           userID: userID, // Exclude rides the user has already booked
//         //                       },
//         //                   },
//         //               },
//         //           };

//         //     const rides = await prisma.route.findMany({
//         //         where,
//         //         take: parseInt(limit, 10),
//         //         include: {
//         //             ride: {
//         //                 include: {
//         //                     driver: true,
//         //                     vehicle: {
//         //                         include: { seats: true },
//         //                     },
//         //                     passengers: true,
//         //                 },
//         //             },
//         //         },
//         //         orderBy: {
//         //             ride: {
//         //                 createdAt: "desc",
//         //             },
//         //         },
//         //     });

//         const rides = await prisma.ride.findMany({
//             where: {
//                 driverID: { not: userID },
//                 status: "SCHEDULED",
//                 bookings: {
//                     none: {
//                         userID: userID,
//                     },
//                 },
//             },
//             select: {
//                 id: true,
//                 driver: {
//                     select: {
//                         id: true,
//                         username: true,
//                         name: true,
//                     },
//                 },
//                 vehicle: {
//                     select: {
//                         id: true,
//                         make: true,
//                         model: true,
//                         year: true,
//                         type: true,
//                         seats: {
//                             select: {
//                                 id: true,
//                                 seatNumber: true,
//                                 isPremium: true,
//                             },
//                         },
//                     },
//                 },
//                 fare: true,
//                 premiumFare: true,
//                 scheduledFor: true,
//                 bookings: {
//                     select: { seat: true },
//                 },
//                 route: { select: { id: true, to: true, from: true } },
//             },
//             take: 10,
//             orderBy: {
//                 createdAt: "desc",
//             },
//         });

//         const response = NextResponse.json({
//             message: "Created rides fetched successfully",
//             data: rides,
//             success: true,
//         });

//         return response;
//     } catch (error) {
//         return Response.json({ error: error.message }, { status: 500 });
//     }
// }


import { getTokenData } from "@/app/helpers/getTokenData";
import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const userID = (await getTokenData(request)) as string;

    // Extract search parameters
    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get("searchTerm") || "";
    const date = searchParams.get("date");

    // Build the query dynamically
    const filters: any = {
      driverID: { not: userID },
      status: "SCHEDULED",
      bookings: {
        none: {
          userID: userID,
        },
      },
    };

    // If searchTerm is provided, search in the relevant fields
    if (searchTerm) {
      filters.OR = [
        { route: { to: { contains: searchTerm, mode: "insensitive" } } },
        { route: { from: { contains: searchTerm, mode: "insensitive" } } },
        { vehicle: { make: { contains: searchTerm, mode: "insensitive" } } },
        { vehicle: { model: { contains: searchTerm, mode: "insensitive" } } },
      ];
    }

    // If date is provided, filter by scheduledFor date
    if (date) {
      const startOfDay = new Date(date);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      filters.scheduledFor = {
        gte: startOfDay,
        lte: endOfDay,
      };
    }

    const rides = await prisma.ride.findMany({
      where: filters,
      select: {
        id: true,
        driver: {
          select: {
            id: true,
            username: true,
            name: true,
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

    return NextResponse.json({
      message: "Filtered rides fetched successfully",
      data: rides,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching rides:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
