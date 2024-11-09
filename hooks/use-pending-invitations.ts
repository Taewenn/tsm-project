import { useQuery } from "@tanstack/react-query";

export const usePendingInvitations = () => {
    return useQuery({
        queryKey: ["pendingInvitations"],
        queryFn: async () => {
            const response = await fetch("/api/invitations/pending");
            if (!response.ok) {
                throw new Error("Erreur lors du chargement des invitations");
            }
            return response.json();
        },
    });
};
