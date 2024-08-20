import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";

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

        const { newType } = body;

        if (!newType || !newType.type || !newType.price) {
            return new NextResponse("Bad Request: newType with type and price required", { status: 400 });
        }

        const currentConfig = await prismadb.configuration.findUnique({
            where: { clientId: params.clientId }
        });

        if (!currentConfig) {
            return new NextResponse("Configuration not found", { status: 404 });
        }

        const currentTypesOfCarWash = Array.isArray(currentConfig.typeOfCarWash)
            ? currentConfig.typeOfCarWash
            : JSON.parse(currentConfig.typeOfCarWash as string);

        const existingTypeIndex = currentTypesOfCarWash.findIndex((t: { type: string }) => t.type === newType.type);

        if (existingTypeIndex === -1) {
            currentTypesOfCarWash.push(newType);

            const updatedConfig = await prismadb.configuration.update({
                where: { clientId: params.clientId },
                data: {
                    typeOfCarWash: currentTypesOfCarWash
                }
            });

            return NextResponse.json(updatedConfig);
        }

        return new NextResponse("Type of car wash already exists", { status: 400 });
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

        const { typeOfCarWash } = body;

        if (!typeOfCarWash) {
            return new NextResponse("Bad Request: typeOfCarWash required", { status: 400 });
        }

        const currentConfig = await prismadb.configuration.findUnique({
            where: { clientId: params.clientId },
        });

        if (!currentConfig) {
            return new NextResponse("Configuration not found", { status: 404 });
        }

        let updatedTypeOfCarWash = Array.isArray(currentConfig.typeOfCarWash)
            ? [...(currentConfig.typeOfCarWash as { type: string; price: number }[])]
            : [];

        updatedTypeOfCarWash = updatedTypeOfCarWash.filter(
            (item) => item.type !== typeOfCarWash
        );

        const updatedConfig = await prismadb.configuration.update({
            where: { clientId: params.clientId },
            data: {
                typeOfCarWash: updatedTypeOfCarWash as any,
            },
        });

        return NextResponse.json(updatedConfig);
    } catch (error) {
        console.log("[CONFIG_DELETE]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
