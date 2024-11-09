import { prisma } from "@/prisma";
import { CreateEventDTO } from "../validations/event";

export class DashboardService {
    static async getDashboardStats(userId: string) {
        const [
            hostedEventsCount,
            pendingInvitationsCount,
            allergiesCount,
            pastEventsCount,
        ] = await Promise.all([
            // Count des événements à venir
            prisma.event.count({
                where: {
                    hostId: userId,
                    dateTime: {
                        gte: new Date(),
                    },
                },
            }),
            // Count des invitations en attente
            prisma.eventAttendee.count({
                where: {
                    userId,
                    status: "PENDING",
                },
            }),
            // Count des allergies
            prisma.allergy.count({
                where: {
                    userId,
                },
            }),
            // Count des événements passés
            prisma.event.count({
                where: {
                    hostId: userId,
                    dateTime: {
                        lt: new Date(),
                    },
                },
            }),
        ]);

        return {
            hostedEventsCount,
            pendingInvitationsCount,
            allergiesCount,
            pastEventsCount,
        };
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
