// hooks/use-allergies.ts
import { AllergyRequest, AllergyResponse } from "@/lib/validations/profile";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

async function fetchAllergies(): Promise<AllergyResponse[]> {
    const response = await fetch("/api/profile/allergies");
    if (!response.ok) {
        throw new Error("Failed to fetch allergies");
    }
    return response.json();
}

async function addAllergy(data: AllergyRequest): Promise<AllergyResponse> {
    const response = await fetch("/api/profile/allergies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error("Failed to add allergy");
    }
    return response.json();
}

async function removeAllergy(id: string): Promise<void> {
    const response = await fetch(`/api/profile/allergies?id=${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Failed to remove allergy");
    }
}

export function useAllergies() {
    return useQuery({
        queryKey: ["allergies"],
        queryFn: fetchAllergies,
    });
}

export function useAddAllergy() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addAllergy,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["allergies"] });
        },
    });
}

export function useRemoveAllergy() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: removeAllergy,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["allergies"] });
        },
    });
}
