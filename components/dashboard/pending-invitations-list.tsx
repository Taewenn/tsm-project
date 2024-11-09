import { usePendingInvitations } from "@/hooks/use-pending-invitations";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
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

function PendingInvitationsList() {
    const { data: invitations, isLoading, error } = usePendingInvitations();
    const queryClient = useQueryClient();

    const handleResponse = async (invitationId: string, status: string) => {
        try {
            const response = await fetch(
                `/api/invitations/${invitationId}/respond`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ status }),
                }
            );

            if (!response.ok) throw new Error("Erreur lors de la réponse");

            await queryClient.invalidateQueries({
                queryKey: ["pendingInvitations"],
            });
            await queryClient.invalidateQueries({
                queryKey: ["dashboardStats"],
            });

            toast({
                title: "Réponse envoyée",
                description: "Votre réponse a bien été prise en compte.",
            });
        } catch (error) {
            toast({
                title: "Erreur",
                description: "Impossible de répondre à l'invitation.",
                variant: "destructive",
            });
        }
    };

    if (isLoading) {
        return <LoadingCards count={2} />;
    }

    if (error) {
        return <ErrorMessage message="Impossible de charger les invitations" />;
    }

    if (!invitations?.length) {
        return <EmptyState message="Aucune invitation en attente" />;
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {invitations.map((invitation: any) => (
                <Card key={invitation.id}>
                    <CardHeader>
                        <CardTitle>{invitation.event.title}</CardTitle>
                        <CardDescription>
                            {new Date(
                                invitation.event.dateTime
                            ).toLocaleDateString("fr-FR", {
                                day: "numeric",
                                month: "long",
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col space-y-2">
                            <div className="flex items-center space-x-2">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">
                                    {invitation.event.attendees.length} invités
                                </span>
                            </div>
                            <div className="flex space-x-2">
                                <Button
                                    className="flex-1"
                                    variant="default"
                                    size="sm"
                                    onClick={() =>
                                        handleResponse(
                                            invitation.id,
                                            "CONFIRMED"
                                        )
                                    }
                                >
                                    Accepter
                                </Button>
                                <Button
                                    className="flex-1"
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                        handleResponse(
                                            invitation.id,
                                            "DECLINED"
                                        )
                                    }
                                >
                                    Décliner
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

export default PendingInvitationsList;
