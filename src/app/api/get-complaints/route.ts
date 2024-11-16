import { getTokenData } from "@/app/helpers/getTokenData";
import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const userID = (await getTokenData(request)) as string;

        const complaints = await prisma.complaint.findMany({
            include: {
                complainant: { select: { username: true } },
                complainee: { select: { username: true } },
            },
        });

        const response = NextResponse.json({
            message: "All complaints fetched successfully",
            data: complaints,
            success: true,
        });

        return response;
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
