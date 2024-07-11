import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { clientId: string, vehicleId: string } }
) {
    try {
        const body = await req.json();
        const { userId }: { userId: string | null } = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        };

        const clientByUserId = await prismadb.client.findFirst({
            where: {
                id: params.clientId,
                userId
            }
        });

        if (!clientByUserId) {
            return new NextResponse("Unauthorized", { status: 403 });
        };

        const vehicleUpdated = await prismadb.vehicle.updateMany({
            where: {
                id: params.vehicleId,
            },
            data: {
                washed: true
            }
        });

        return NextResponse.json(vehicleUpdated);
    } catch (error) {
        console.log("[VEHICLE_READY_PATCH]", error);
        return new NextResponse("Internal error", { status: 500 });
    };
};