import { useUpcomingEvents } from "@/hooks/use-upcoming-events";
import { Users } from "lucide-react";
import EmptyState from "../global/empty-state";
import ErrorMessage from "../global/error-message";
import LoadingCards from "../global/loading-cards";
import { Button } from "../ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";

function UpcomingEventsList() {
    const { data: events, isLoading, error } = useUpcomingEvents();

    if (isLoading) {
        return <LoadingCards count={3} />;
    }

    if (error) {
        return (
            <ErrorMessage message="Impossible de charger les événements à venir" />
        );
    }

    if (!events?.length) {
        return <EmptyState message="Aucun événement à venir" />;
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event: any) => (
                <Card key={event.id}>
                    <CardHeader>
                        <CardTitle>{event.title}</CardTitle>
                        <CardDescription>
                            {new Date(event.dateTime).toLocaleDateString(
                                "fr-FR",
                                {
                                    day: "numeric",
                                    month: "long",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                }
                            )}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">
                                    {event.attendees.length} invités
                                </span>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                    (window.location.href = `/events/${event.id}`)
                                }
                            >
                                Voir détails
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

export default UpcomingEventsList;
