import { prisma } from "@/prisma";
import {
    AllergyRequest,
    DietaryPreferenceRequest,
    ProfileUpdateRequest,
} from "../validations/profile";

export class ProfileService {
    static async getProfile(userId: string) {
        return prisma.user.findUnique({
            where: { id: userId },
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

    static async updateProfile(userId: string, data: ProfileUpdateRequest) {
        return prisma.user.update({
            where: { id: userId },
            data,
            select: {
                id: true,
                name: true,
                email: true,
            },
        });
    }

    static async addDietaryPreference(
        userId: string,
        data: DietaryPreferenceRequest
    ) {
        return prisma.dietaryPreference.create({
            data: {
                ...data,
                userId,
            },
        });
    }

    static async removeDietaryPreference(userId: string, preferenceId: string) {
        return prisma.dietaryPreference.deleteMany({
            where: {
                id: preferenceId,
                userId,
            },
        });
    }

    static async addAllergy(userId: string, data: AllergyRequest) {
        return prisma.allergy.create({
            data: {
                ...data,
                userId,
            },
        });
    }

    static async removeAllergy(userId: string, allergyId: string) {
        return prisma.allergy.deleteMany({
            where: {
                id: allergyId,
                userId,
            },
        });
    }

    static async updateAllergy(
        userId: string,
        allergyId: string,
        data: AllergyRequest
    ) {
        return prisma.allergy.updateMany({
            where: {
                id: allergyId,
                userId,
            },
            data,
        });
    }
}
