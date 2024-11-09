import { z } from "zod";

export type CreateEventDTO = {
    title: string;
    description: string;
    dateTime: string;
    location: string;
    maxGuests: number;
    invitationLink: string;
};

// Schémas de validation
export const createEventSchema = z.object({
    title: z.string().min(2).max(100),
    description: z.string().min(2).max(500),
    dateTime: z.string().refine((date) => {
        // Ensure the date string is in the correct format and valid
        try {
            new Date(`${date}:00.000Z`).toISOString();
            return true;
        } catch {
            return false;
        }
    }, "Format de date invalide"),
    location: z.string().min(2).max(100),
    maxGuests: z.number().min(1),
    invitationLink: z.string(),
});
