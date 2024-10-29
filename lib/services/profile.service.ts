import { prisma } from "@/prisma";
import {
    AllergyRequest,
    DietaryPreferenceRequest,
    ProfileUpdateRequest,
} from "../validations/profile";

export class ProfileService {
    static async getProfile(email: string) {
        return prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                name: true,
                email: true,
                dietaryPreferences: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                    },
                },
                allergies: {
                    select: {
                        id: true,
                        name: true,
                        severity: true,
                    },
                },
            },
        });
    }

    static async updateProfile(email: string, data: ProfileUpdateRequest) {
        return prisma.user.update({
            where: { email },
            data,
            select: {
                id: true,
                name: true,
                email: true,
            },
        });
    }

    static async addDietaryPreference(
        email: string,
        data: DietaryPreferenceRequest
    ) {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) throw new Error("User not found");

        return prisma.dietaryPreference.create({
            data: {
                ...data,
                userId: user.id,
            },
        });
    }

    static async removeDietaryPreference(email: string, preferenceId: string) {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) throw new Error("User not found");

        return prisma.dietaryPreference.deleteMany({
            where: {
                id: preferenceId,
                userId: user.id,
            },
        });
    }

    static async addAllergy(email: string, data: AllergyRequest) {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) throw new Error("User not found");

        return prisma.allergy.create({ data: { ...data, userId: user.id } });
    }

    static async removeAllergy(email: string, allergyId: string) {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) throw new Error("User not found");

        return prisma.allergy.deleteMany({
            where: { id: allergyId, userId: user.id },
        });
    }

    static async updateAllergy(
        email: string,
        allergyId: string,
        data: AllergyRequest
    ) {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) throw new Error("User not found");

        return prisma.allergy.updateMany({
            where: { id: allergyId, userId: user.id },
            data,
        });
    }

    static async getAllergies(email: string) {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) throw new Error("User not found");

        return prisma.allergy.findMany({
            where: { userId: user.id },
            select: {
                id: true,
                name: true,
                severity: true,
            },
        });
    }
}
