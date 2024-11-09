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

    static async createNewEvent(userId: string, data: any) {
        return prisma.event.create({
            data: {
                title: data.title,
                description: data.description,
                dateTime: data.dateTime,
                location: data.location,
                host: {
                    connect: {
                        id: userId,
                    },
                },
                maxGuests: data.maxGuests,
                invitationLink: data.invitationLink,
            },
        });
    }
}
