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
        const { vehicle, licensePlate,
            color,
            phoneNumber,
            price,
            typeOfCarWash,
            observations, } = body;

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

        const clientByUserId = await prismadb.client.findFirst({
            where: {
                id: params.clientId,
                userId
            }
        });

        if (!clientByUserId) {
            return new NextResponse("Unauthorized", { status: 403 });
        };

        const car = await prismadb.vehicle.create({
            data: {
                vehicle,
                licensePlate,
                color,
                phoneNumber,
                price,
                typeOfCarWash,
                observations,
                clientId: params.clientId
            }
        });

        return NextResponse.json(car);
    } catch (error: any) {
        console.log("[CAR_POST]", error);
        return new NextResponse("Internal error", { status: 500 });
    };
};