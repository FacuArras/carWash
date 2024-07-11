import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";

export async function POST(
    req: Request,
    { params }: { params: { clientId: string } }
) {
    try {
        const body = await req.json();
        const { userId }: { userId: string | null } = auth();
        const { vehicle,
            typeOfCarWash,
        } = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        };

        if (!vehicle) {
            return new NextResponse("Vehicle configurations are required", { status: 400 });
        };

        if (!typeOfCarWash) {
            return new NextResponse("The type of car wash configurations are required", { status: 400 });
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

        const car = await prismadb.configuration.create({
            data: {
                vehicle,
                typeOfCarWash,
                clientId: params.clientId
            }
        });

        return NextResponse.json(car);
    } catch (error: any) {
        console.log("[CONFIG_POST]", error);
        return new NextResponse("Internal error", { status: 500 });
    };
};

export async function PATCH(
    req: Request,
    { params }: { params: { clientId: string, vehicleId: string } }
) {
    try {
        const body = await req.json();
        const { userId }: { userId: string | null } = auth();

        const { vehicle,
            typeOfCarWash,
        } = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        };

        if (!vehicle) {
            return new NextResponse("Vehicle configurations are required", { status: 400 });
        };

        if (!typeOfCarWash) {
            return new NextResponse("The type of car wash configurations are required", { status: 400 });
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
                vehicle,
                typeOfCarWash,
                clientId: params.clientId
            }
        });

        return NextResponse.json(vehicleUpdated);
    } catch (error) {
        console.log("[CONFIG_PATCH]", error);
        return new NextResponse("Internal error", { status: 500 });
    };
};