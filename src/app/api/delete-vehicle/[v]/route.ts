import { getTokenData } from "@/app/helpers/getTokenData";
import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
    request: NextRequest,
    { params }: { params: { v: string } }
) {
    const { v } = await params;
    console.log(v);
    try {
        await prisma.vehicle.delete({ where: { id: v } });

        const response = NextResponse.json({
            message: "Vehicle deleted successfully",
            success: true,
        });

        return response;
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
