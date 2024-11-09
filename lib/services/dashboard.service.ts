import { prisma } from "@/prisma";
import { CreateEventDTO } from "../validations/event";

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

    static async createNewEvent(userId: string, data: CreateEventDTO) {
        // Convert the dateTime string to a proper ISO date string
        // Add seconds and milliseconds to meet ISO-8601 format
        const formattedDateTime = new Date(
            `${data.dateTime}:00.000Z`
        ).toISOString();

        return prisma.event.create({
            data: {
                title: data.title,
                description: data.description,
                dateTime: formattedDateTime,
                location: data.location,
                hostId: userId,
                maxGuests: data.maxGuests,
                invitationLink: data.invitationLink,
            },
        });
    }
}
