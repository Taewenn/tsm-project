import { AllergySeverity } from "@prisma/client";
import { z } from "zod";

// Types de base
export type ProfileUpdateRequest = {
    name?: string;
    email?: string;
};

export type DietaryPreferenceRequest = {
    name: string;
    description?: string;
};

export type AllergyRequest = {
    name: string;
    severity: AllergySeverity;
};

// Schémas de validation
export const profileUpdateSchema = z.object({
    name: z.string().min(2).max(100).optional(),
    email: z.string().email().optional(),
});

export const dietaryPreferenceSchema = z.object({
    name: z.string().min(2).max(100),
    description: z.string().max(500).optional(),
});

export const allergySchema = z.object({
    name: z.string().min(2).max(100),
    severity: z.enum(["MILD", "MODERATE", "SEVERE", "FATAL"]),
});

// Types de réponse
export type ProfileResponse = {
    id: string;
    name: string | null;
    email: string;
    dietaryPreferences: {
        id: string;
        name: string;
        description: string | null;
    }[];
    allergies: {
        id: string;
        name: string;
        severity: AllergySeverity;
    }[];
};

export type DietaryPreferenceResponse = {
    id: string;
    name: string;
    description: string | null;
};

export type AllergyResponse = {
    id: string;
    name: string;
    severity: AllergySeverity;
};
