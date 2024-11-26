import { getTokenData } from "@/app/helpers/getTokenData";
import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
    request: NextRequest,
    { params }: { params: { r: string } }
) {
    const { r } = await params;
    console.log(r);
    try {
        await prisma.ride.delete({ where: { id: r } });

        const response = NextResponse.json({
            message: "Ride deleted successfully",
            success: true,
        });

        return response;
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
