// import { getTokenData } from "@/app/helpers/getTokenData";
// import prisma from "@/app/lib/prisma";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(request: NextRequest) {
//     try {
//         const userID = (await getTokenData(request)) as string;

//         const createdRides = await prisma.ride.findMany({
//             where: { driverID: userID },
//         });

//         const response = NextResponse.json({
//             message: "Created rides fetched successfully",
//             data: createdRides,
//             success: true,
//         });

//         return response;
//     } catch (error) {
//         return Response.json({ error: error.message }, { status: 500 });
//     }
// }
