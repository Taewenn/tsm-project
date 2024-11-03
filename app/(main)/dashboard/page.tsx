"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AlertTriangle, Calendar, Plus, Users } from "lucide-react";

// Hooks personnalisés pour la gestion des données
const useDashboardStats = () => {
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

const useUpcomingEvents = () => {
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

const usePendingInvitations = () => {
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

const usePastEvents = () => {
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

// Composant principal du Dashboard
export default function DashboardPage() {
    const { data: stats, isLoading: isLoadingStats } = useDashboardStats();

    if (isLoadingStats) {
        return <DashboardSkeleton />;
    }

    return (
        <div className="flex-1 space-y-4 p-4 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <div className="flex items-center space-x-2">
                    <Button
                        onClick={() => (window.location.href = "/events/new")}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Nouvel événement
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Événements à venir"
                    value={stats?.upcomingEventsCount || "0"}
                    description="Dans les 30 prochains jours"
                    icon={
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    }
                />
                <StatsCard
                    title="Invitations en attente"
                    value={stats?.pendingInvitationsCount || "0"}
                    description="Réponses attendues"
                    icon={<Users className="h-4 w-4 text-muted-foreground" />}
                />
                <StatsCard
                    title="Allergies à gérer"
                    value={stats?.allergiesCount || "0"}
                    description="Attention particulière requise"
                    icon={<AlertTriangle className="h-4 w-4 text-red-500" />}
                />
                <StatsCard
                    title="Événements passés"
                    value={stats?.pastEventsCount || "0"}
                    description="Dans les 30 derniers jours"
                    icon={
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    }
                />
            </div>

            {/* Main Content Tabs */}
            <Tabs defaultValue="upcoming" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="upcoming">À venir</TabsTrigger>
                    <TabsTrigger value="invitations">Invitations</TabsTrigger>
                    <TabsTrigger value="past">Passés</TabsTrigger>
                </TabsList>
                <TabsContent value="upcoming" className="space-y-4">
                    <UpcomingEventsList />
                </TabsContent>
                <TabsContent value="invitations" className="space-y-4">
                    <PendingInvitationsList />
                </TabsContent>
                <TabsContent value="past" className="space-y-4">
                    <PastEventsList />
                </TabsContent>
            </Tabs>
        </div>
    );
}

function DashboardSkeleton() {
    return (
        <div className="flex-1 space-y-4 p-4 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
                <div className="h-10 w-40 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4].map((i) => (
                    <Card key={i} className="animate-pulse">
                        <CardHeader className="space-y-2">
                            <div className="h-4 w-24 bg-gray-200 rounded" />
                            <div className="h-8 w-12 bg-gray-200 rounded" />
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    );
}

// Composant StatsCard réutilisable
type StatsCardProps = {
    title: string;
    value: string;
    description: string;
    icon: React.ReactNode;
};

function StatsCard({ title, value, description, icon }: StatsCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground">{description}</p>
            </CardContent>
        </Card>
    );
}

// Liste des événements à venir avec données
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

// Liste des invitations en attente avec données
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

// Liste des événements passés
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

// Composants utilitaires
function LoadingCards({ count = 3 }) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array(count)
                .fill(0)
                .map((_, i) => (
                    <Card key={i} className="animate-pulse">
                        <CardHeader className="space-y-2">
                            <div className="h-4 w-3/4 bg-gray-200 rounded" />
                            <div className="h-3 w-1/2 bg-gray-200 rounded" />
                        </CardHeader>
                        <CardContent>
                            <div className="h-8 w-full bg-gray-200 rounded" />
                        </CardContent>
                    </Card>
                ))}
        </div>
    );
}

function ErrorMessage({ message }: { message: string }) {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
            <AlertTriangle className="h-8 w-8 text-red-500 mb-4" />
            <p className="text-lg font-medium text-red-500">{message}</p>
        </div>
    );
}

function EmptyState({ message }: { message: string }) {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
            <Calendar className="h-8 w-8 text-muted-foreground mb-4" />
            <p className="text-lg font-medium text-muted-foreground">
                {message}
            </p>
        </div>
    );
}
