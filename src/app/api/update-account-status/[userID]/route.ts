import { getTokenData } from "@/app/helpers/getTokenData";
import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    request: NextRequest,
    { params }: { params: { userID: string } }
) {
    const { userID } = await params;
    console.log(userID);
    const body = await request.json();
    const { status } = body;
    try {
        await prisma.user.update({ data: { status }, where: { id: userID } });
        console.log(status, userID);
        const response = NextResponse.json({
            message: "Account status updated successfully",
            success: true,
        });

        return response;
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
