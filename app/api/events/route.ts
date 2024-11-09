import { auth } from "@/auth";
import { DashboardService } from "@/lib/services/dashboard.service";
import { createEventSchema } from "@/lib/validations/event";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const session = await auth();

    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const validatedData = createEventSchema.parse(body);

        const event = await DashboardService.createNewEvent(
            session.user.id,
            validatedData
        );

        return NextResponse.json(event);
    } catch (error: any) {
        if (error.name === "ZodError") {
            return NextResponse.json(
                { error: "Invalid data", details: error.errors },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: JSON.stringify(error.message) },
            { status: 500 }
        );
    }
}
