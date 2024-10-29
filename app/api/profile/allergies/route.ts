import { auth } from "@/auth";
import { ProfileService } from "@/lib/services/profile.service";
import { NextResponse } from "next/server";
import { z } from "zod";

const allergySchema = z.object({
    name: z.string().min(1),
    severity: z.enum(["MILD", "MODERATE", "SEVERE", "FATAL"]),
});

export async function POST(request: Request) {
    const session = await auth();
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const validatedData = allergySchema.parse(body);
        const allergy = await ProfileService.addAllergy(
            session.user.email,
            validatedData
        );
        return NextResponse.json(allergy);
    } catch (error) {
        console.error("Error adding allergy:", error);
        return NextResponse.json(
            { error: "Failed to add allergy" },
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
