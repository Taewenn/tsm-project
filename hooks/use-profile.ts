import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AllergySeverity } from "./../node_modules/.pnpm/@prisma+client@5.22.0_prisma@5.22.0/node_modules/.prisma/client/index.d";

interface Profile {
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
}

// Fetch profile
export function useProfile() {
    return useQuery<Profile>({
        queryKey: ["profile"],
        queryFn: async () => {
            const response = await fetch("/api/profile");
            if (!response.ok) {
                throw new Error("Failed to fetch profile");
            }
            return response.json();
        },
    });
}

// Update profile
export function useUpdateProfile() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: { name: string }) => {
            const response = await fetch("/api/profile", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error("Failed to update profile");
            }
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profile"] });
        },
    });
}

// Add dietary preference
export function useAddDietaryPreference() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: { name: string; description?: string }) => {
            const response = await fetch("/api/profile/preferences", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error("Failed to add dietary preference");
            }
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profile"] });
        },
    });
}

// Remove dietary preference
export function useRemoveDietaryPreference() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ preferenceId }: { preferenceId: string }) => {
            const response = await fetch(
                `/api/profile/preferences/${preferenceId}`,
                {
                    method: "DELETE",
                }
            );
            if (!response.ok) {
                throw new Error("Failed to remove dietary preference");
            }
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profile"] });
        },
    });
}

// Add allergy
export function useAddAllergy() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: {
            name: string;
            severity: AllergySeverity;
        }) => {
            const response = await fetch("/api/profile/allergies", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error("Failed to add allergy");
            }
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profile"] });
        },
    });
}

// Remove allergy
export function useRemoveAllergy() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ allergyId }: { allergyId: string }) => {
            const response = await fetch(
                `/api/profile/allergies/${allergyId}`,
                {
                    method: "DELETE",
                }
            );
            if (!response.ok) {
                throw new Error("Failed to remove allergy");
            }
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profile"] });
        },
    });
}
