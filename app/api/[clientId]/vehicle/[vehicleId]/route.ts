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

        const { vehicle, licensePlate,
            color,
            phoneNumber,
            price,
            typeOfCarWash,
            brand,
            observations } = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        };

        if (!vehicle) {
            return new NextResponse("Vehicle Plate is required", { status: 400 });
        };

        if (!licensePlate) {
            return new NextResponse("License Plate is required", { status: 400 });
        };

        if (!color) {
            return new NextResponse("Color is required", { status: 400 });
        };

        if (!phoneNumber) {
            return new NextResponse("Phone Number is required", { status: 400 });
        };

        if (!price) {
            return new NextResponse("Price is required", { status: 400 });
        };

        if (!typeOfCarWash) {
            return new NextResponse("The type of car wash is required", { status: 400 });
        };

        if (!brand) {
            return new NextResponse("Car brand is required", { status: 400 });
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
                vehicle, licensePlate,
                color,
                phoneNumber,
                price,
                typeOfCarWash,
                brand,
                observations,
                clientId: params.clientId
            }
        });

        return NextResponse.json(vehicleUpdated);
    } catch (error) {
        console.log("[VEHICLE_PATCH]", error);
        return new NextResponse("Internal error", { status: 500 });
    };
};

export async function DELETE(
    req: Request,
    { params }: { params: { clientId: string, vehicleId: string } }
) {
    try {
        const { userId }: { userId: string | null } = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        };

        if (!params.vehicleId) {
            return new NextResponse("Vehicle id is required", { status: 400 });
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

        const vehicleDeleted = await prismadb.vehicle.deleteMany({
            where: {
                id: params.vehicleId
            }
        });

        return NextResponse.json(vehicleDeleted);
    } catch (error) {
        console.log("[VEHICLE_DELETE]", error);
        return new NextResponse("Internal error", { status: 500 });
    };
};