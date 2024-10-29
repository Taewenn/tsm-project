import { auth } from "@/auth";
import { ProfileService } from "@/lib/services/profile.service";
import { NextResponse } from "next/server";

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    const session = await auth();
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        await ProfileService.removeAllergy(session.user.email, params.id);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error removing allergy:", error);
        return NextResponse.json(
            { error: "Failed to remove allergy" },
            { status: 500 }
        );
    }
}
