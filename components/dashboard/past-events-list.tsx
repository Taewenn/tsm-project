import { usePastEvents } from "@/hooks/use-past-events";
import { Users } from "lucide-react";
import EmptyState from "../global/empty-state";
import ErrorMessage from "../global/error-message";
import LoadingCards from "../global/loading-cards";
import { Button } from "../ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "../ui/card";

function PastEventsList() {
    const { data: events, isLoading, error } = usePastEvents();

    if (isLoading) {
        return <LoadingCards count={3} />;
    }

    if (error) {
        return (
            <ErrorMessage message="Impossible de charger les événements passés" />
        );
    }

    if (!events?.length) {
        return <EmptyState message="Aucun événement passé" />;
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event: any) => (
                <Card key={event}>
                    <CardHeader>
                        <CardTitle>Soirée Jeux</CardTitle>
                        <CardDescription>1 Mars 2024 - 20h00</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">
                                    6 participants
                                </span>
                            </div>
                            <Button variant="ghost" size="sm">
                                Voir photos
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

export default PastEventsList;
