import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";

export async function POST(
    req: Request,
) {
    try {
        const body = await req.json();
        const { userId }: { userId: string | null } = auth();
        const { name } = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        };

        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        };

        const client = await prismadb.client.create({
            data: {
                name, userId
            }
        });

        return NextResponse.json(client);
    } catch (error: any) {
        console.log("[CLIENT_POST]", error);
        return new NextResponse("Internal error", { status: 500 });
    };
};