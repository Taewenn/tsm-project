import { prisma } from "@/prisma";

export class DashboardService {
    static async getDashboardStats(userId: string) {
        return prisma.user.findUnique({
            where: { id: userId },
            select: {
                hostedEvents: {
                    where: {
                        dateTime: { gte: new Date() },
                    },
                },
                attendances: {
                    where: {
                        status: "PENDING",
                    },
                },
                allergies: {
                    orderBy: {
                        createdAt: "desc",
                    },
                },
            },
        });
    }

    static async getUpcomingEvents(userId: string) {
        return prisma.event.findMany({
            where: {
                OR: [
                    { hostId: userId },
                    {
                        attendees: {
                            some: {
                                userId,
                                status: "CONFIRMED",
                            },
                        },
                    },
                ],
                dateTime: {
                    gte: new Date(),
                },
            },
            orderBy: {
                dateTime: "asc",
            },
            take: 6,
        });
    }
}
