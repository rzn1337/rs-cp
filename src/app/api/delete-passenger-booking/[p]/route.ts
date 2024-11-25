import { getTokenData } from "@/app/helpers/getTokenData";
import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
    request: NextRequest,
    { params }: { params: { p: string } }
) {
    const { p } = await params;
    console.log(p);
    try {
        await prisma.booking.delete({ where: { id: p } });

        const response = NextResponse.json({
            message: "Booking deleted successfully",
            success: true,
        });

        return response;
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
