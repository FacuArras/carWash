import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";

export async function GET(
    req: Request,
    { params }: { params: { clientId: string } }) {
    try {
        const configurations = await prismadb.configuration.findFirst({
            where: {
                clientId: params.clientId
            }
        })

        return NextResponse.json({ configurations });
    }
    catch (error) {
        console.log("[CONFIG_GET]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

interface ConfigUpdates {
    vehicle?: string;
    message?: string;
}

export async function PATCH(
    req: Request,
    { params }: { params: { clientId: string } }
) {
    try {
        const body = await req.json();
        const { userId }: { userId: string | null } = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        const clientByUserId = await prismadb.client.findFirst({
            where: {
                id: params.clientId,
                userId
            }
        });

        if (!clientByUserId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        const configUpdates: ConfigUpdates = body;

        const currentConfig = await prismadb.configuration.findUnique({
            where: { clientId: params.clientId }
        });

        if (!currentConfig) {
            return new NextResponse("Configuration not found", { status: 404 });
        }

        let updatedVehicle = currentConfig.vehicle ? [...currentConfig.vehicle] : [];
        let updatedMessage = currentConfig.message;

        if (configUpdates.vehicle) {
            updatedVehicle = Array.from(new Set([...updatedVehicle, configUpdates.vehicle]));
        }

        if (configUpdates.message) {
            updatedMessage = configUpdates.message;
        }

        const configUpdated = await prismadb.configuration.update({
            where: { clientId: params.clientId },
            data: {
                vehicle: updatedVehicle,
                message: updatedMessage
            }
        });

        return NextResponse.json(configUpdated);
    } catch (error) {
        console.log("[CONFIG_PATCH]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { clientId: string } }
) {
    try {
        const body = await req.json();
        const { userId }: { userId: string | null } = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        const { vehicle } = body;

        if (!vehicle) {
            return new NextResponse("Bad Request: vehicle required", { status: 400 });
        }

        const currentConfig = await prismadb.configuration.findUnique({
            where: { clientId: params.clientId }
        });

        if (!currentConfig) {
            return new NextResponse("Configuration not found", { status: 404 });
        }

        let updatedVehicle = currentConfig.vehicle;

        if (vehicle) {
            updatedVehicle = updatedVehicle.filter((item: string) => item !== vehicle);
        }

        const updatedConfig = await prismadb.configuration.update({
            where: { clientId: params.clientId },
            data: {
                vehicle: updatedVehicle,
            }
        });

        return NextResponse.json(updatedConfig);
    } catch (error) {
        console.log("[CONFIG_DELETE]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
