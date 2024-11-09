import { useQuery } from "@tanstack/react-query";

export const useUpcomingEvents = () => {
    return useQuery({
        queryKey: ["upcomingEvents"],
        queryFn: async () => {
            const response = await fetch("/api/events/upcoming");
            if (!response.ok) {
                throw new Error(
                    "Erreur lors du chargement des événements à venir"
                );
            }
            return response.json();
        },
    });
};
