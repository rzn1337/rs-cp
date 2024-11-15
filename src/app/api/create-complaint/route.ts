import { getTokenData } from "@/app/helpers/getTokenData";
import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { rideID, complaineeID, subject, description } = body;

        const userID = (await getTokenData(request)) as string;

        const complaint = await prisma.complaint.create({
            data: {
                subject,
                description,
                complainantID: userID,
                rideID,
                complaineeID,
            },
        }); 

        return NextResponse.json(
            {
                message: "Ride created successfully",
                data: complaint,
                success: true,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
