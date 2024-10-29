import { jwtVerify } from "jose";
import { NextRequest } from "next/server";


export const getTokenData = async (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || "";

        if (!token) throw new Error("Token not found");

        const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

        const { payload } = await jwtVerify(token, secret);

        return payload.id;
    } catch (error: any) {
        throw new Error(error.message);
    }
};
