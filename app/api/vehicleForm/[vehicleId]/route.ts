import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { vehicleId: string } }
) {
    try {
        const body = await req.json();

        const { vehicle, licensePlate,
            color,
            phoneNumber,
            price,
            typeOfCarWash,
            observations } = body;

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
                observations
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
    { params }: { params: { vehicleId: string } }
) {
    try {
        if (!params.vehicleId) {
            return new NextResponse("Vehicle id is required", { status: 400 });
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