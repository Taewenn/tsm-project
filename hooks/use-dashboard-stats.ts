import { useQuery } from "@tanstack/react-query";

export const useDashboardStats = () => {
    return useQuery({
        queryKey: ["dashboardStats"],
        queryFn: async () => {
            const response = await fetch("/api/dashboard");
            if (!response.ok) {
                throw new Error("Erreur lors du chargement des statistiques");
            }
            return response.json();
        },
    });
};
