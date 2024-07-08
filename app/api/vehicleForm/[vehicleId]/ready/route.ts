import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { vehicleId: string } }
) {
    try {
        const body = await req.json();

        const { washed } = body;

        if (!washed) {
            return new NextResponse("Washed boolean is required", { status: 400 });
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