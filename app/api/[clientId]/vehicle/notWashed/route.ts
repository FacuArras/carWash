import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: Request, { params }: { params: { clientId: string } }) {
    try {
        const { userId }: { userId: string | null } = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        const vehicles = await prismadb.vehicle.findMany({
            where: {
                clientId: params.clientId,
                status: {
                    in: ["waiting", "washing"]
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(vehicles);
    } catch (error: any) {
        console.log("[VEHICLES_NOT_WASHED_GET]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
