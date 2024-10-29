// hooks/use-profile.ts
import {
    DietaryPreferenceRequest,
    ProfileResponse,
    ProfileUpdateRequest,
} from "@/lib/validations/profile";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

async function fetchProfile(): Promise<ProfileResponse> {
    const response = await fetch("/api/profile");
    if (!response.ok) {
        throw new Error("Failed to fetch profile");
    }
    return response.json();
}

async function updateProfile(
    data: ProfileUpdateRequest
): Promise<ProfileResponse> {
    const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error("Failed to update profile");
    }
    return response.json();
}

export function useProfile() {
    return useQuery({
        queryKey: ["profile"],
        queryFn: fetchProfile,
    });
}

export function useUpdateProfile() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profile"] });
        },
    });
}

export function useAddDietaryPreference() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: DietaryPreferenceRequest) => {
            const response = await fetch("/api/profile/preferences", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error("Failed to add preference");
            }
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profile"] });
        },
    });
}
