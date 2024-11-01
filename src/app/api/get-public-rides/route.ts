import { getTokenData } from "@/app/helpers/getTokenData";
import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const params = request.nextUrl.searchParams;
        const searchTerm = params.get("search");
        const limit = params.get("limit");

        // console.log(searchTerm, limit);

        const where = searchTerm
            ? {
                  OR: [
                      { to: { contains: searchTerm, mode: "insensitive" } },
                      { from: { contains: searchTerm, mode: "insensitive" } },
                  ],
                  ride: {
                      status: "SCHEDULED",
                  },
              }
            : {
                  ride: {
                      status: "SCHEDULED",
                  },
              };

        const rides = await prisma.route.findMany({
            where,
            take: parseInt(limit, 10),
            include: {
                ride: true,
            },
            orderBy: {
                ride: {
                    createdAt: "desc",
                },
            },
        });

        console.log(rides);

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
