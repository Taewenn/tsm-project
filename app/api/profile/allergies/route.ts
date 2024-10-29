import { auth } from "@/auth";
import { ProfileService } from "@/lib/services/profile.service";
import { allergySchema } from "@/lib/validations/profile";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const session = await auth();

    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const validatedData = allergySchema.parse(body);

        const allergy = await ProfileService.addAllergy(
            session.user.id,
            validatedData
        );

        return NextResponse.json(allergy);
    } catch (error: any) {
        if (error.name === "ZodError") {
            return NextResponse.json(
                { error: "Invalid data", details: error.errors },
                { status: 400 }
            );
        }

        console.error("Error adding allergy:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request) {
    const session = await auth();

    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json(
                { error: "Missing allergy ID" },
                { status: 400 }
            );
        }

        await ProfileService.removeAllergy(session.user.id, id);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error removing allergy:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}