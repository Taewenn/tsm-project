import { auth } from "@/auth";
import { DashboardService } from "@/lib/services/dashboard.service";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await auth();

    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const [stats, upcomingEvents] = await Promise.all([
            DashboardService.getDashboardStats(session.user.id),
            DashboardService.getUpcomingEvents(session.user.id),
        ]);

        return NextResponse.json({ stats, upcomingEvents });
    } catch (error) {
        console.error("Dashboard error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
