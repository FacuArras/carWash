import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import bcrypt from "bcrypt";

export async function POST(
    req: Request,
) {
    try {
        const body = await req.json();
        const { userId }: { userId: string | null } = auth();
        const { name, password } = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        };

        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        };

        if (!password) {
            return new NextResponse("Password is required", { status: 400 });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const client = await prismadb.client.create({
            data: {
                name, password: hashedPassword, userId
            }
        });

        const config = await prismadb.configuration.create({
            data: {
                clientId: client.id
            }
        })

        return NextResponse.json(client);
    } catch (error: any) {
        console.log("[CLIENT_POST]", error);
        return new NextResponse("Internal error", { status: 500 });
    };
};

export async function GET(req: Request) {
    try {
        const { userId } = auth();
        const { searchParams } = new URL(req.url);
        const password = searchParams.get("password");

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!password) {
            return new NextResponse("Password is required", { status: 400 });
        }

        const client = await prismadb.client.findFirst({
            where: { userId: userId },
        });

        if (!client) {
            return new NextResponse("User not found", { status: 404 });
        }

        const passwordMatch = await bcrypt.compare(password, client.password);

        if (!passwordMatch) {
            return new NextResponse("Invalid credentials", { status: 401 });
        }

        return NextResponse.json(client);
    } catch (error: any) {
        console.log("[CLIENT_GET]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}