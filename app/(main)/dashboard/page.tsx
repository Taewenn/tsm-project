import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Calendar, Plus, Users } from "lucide-react";
import React from "react";

// Composant principal du Dashboard
export default function DashboardPage() {
    return (
        <div className="flex-1 space-y-4 p-4 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <div className="flex items-center space-x-2">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Nouvel événement
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Événements à venir"
                    value="3"
                    description="Dans les 30 prochains jours"
                    icon={
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    }
                />
                <StatsCard
                    title="Invitations en attente"
                    value="12"
                    description="Réponses attendues"
                    icon={<Users className="h-4 w-4 text-muted-foreground" />}
                />
                <StatsCard
                    title="Allergies à gérer"
                    value="2"
                    description="Attention particulière requise"
                    icon={<AlertTriangle className="h-4 w-4 text-red-500" />}
                />
                <StatsCard
                    title="Événements passés"
                    value="8"
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

// Liste des événements à venir
function UpcomingEventsList() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((event) => (
                <Card key={event}>
                    <CardHeader>
                        <CardTitle>Dîner chez Marie</CardTitle>
                        <CardDescription>12 Mars 2024 - 19h00</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">
                                    8 invités
                                </span>
                            </div>
                            <Button variant="outline" size="sm">
                                Voir détails
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

// Liste des invitations en attente
function PendingInvitationsList() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2].map((invitation) => (
                <Card key={invitation}>
                    <CardHeader>
                        <CardTitle>BBQ chez Thomas</CardTitle>
                        <CardDescription>15 Mars 2024 - 12h30</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col space-y-2">
                            <div className="flex items-center space-x-2">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">
                                    12 invités
                                </span>
                            </div>
                            <div className="flex space-x-2">
                                <Button
                                    className="flex-1"
                                    variant="default"
                                    size="sm"
                                >
                                    Accepter
                                </Button>
                                <Button
                                    className="flex-1"
                                    variant="outline"
                                    size="sm"
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
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((event) => (
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
