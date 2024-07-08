import { useAuth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(
    req: Request
) {
    try {
        const body = await req.json();
        const { vehicle, licensePlate,
            color,
            phoneNumber,
            price,
            typeOfCarWash,
            observations, } = body;

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

        const car = await prismadb.vehicle.create({
            data: {
                vehicle,
                licensePlate,
                color,
                phoneNumber,
                price,
                typeOfCarWash,
                observations
            }
        });

        return NextResponse.json(car);
    } catch (error: any) {
        console.log("[CAR_POST]", error);
        return new NextResponse("Internal error", { status: 500 });
    };
};