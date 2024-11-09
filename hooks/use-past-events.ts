import { useQuery } from "@tanstack/react-query";

export const usePastEvents = () => {
    return useQuery({
        queryKey: ["pastEvents"],
        queryFn: async () => {
            const response = await fetch("/api/events/past");
            if (!response.ok) {
                throw new Error(
                    "Erreur lors du chargement des événements passés"
                );
            }
            return response.json();
        },
    });
};
