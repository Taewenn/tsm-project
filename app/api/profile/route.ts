// app/api/profile/route.ts
import { auth } from "@/auth";
import { ProfileService } from "@/lib/services/profile.service";
import { profileUpdateSchema } from "@/lib/validations/profile";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await auth();

    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const profile = await ProfileService.getProfile(
            session.user.email as string
        ); // On utilise l'email comme identifiant unique
        return NextResponse.json(profile);
    } catch (error) {
        console.error("Error fetching profile:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function PATCH(request: Request) {
    const session = await auth();

    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const validatedData = profileUpdateSchema.parse(body);

        const updatedProfile = await ProfileService.updateProfile(
            session.user.email as string,
            validatedData
        );

        return NextResponse.json(updatedProfile);
    } catch (error: any) {
        if (error.name === "ZodError") {
            return NextResponse.json(
                { error: "Invalid data", details: error.errors },
                { status: 400 }
            );
        }

        console.error("Error updating profile:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
