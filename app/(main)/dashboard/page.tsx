"use client";

import CreateNewEvent from "@/components/dashboard/create-new-event";
import PastEventsList from "@/components/dashboard/past-events-list";
import PendingInvitationsList from "@/components/dashboard/pending-invitations-list";
import UpcomingEventsList from "@/components/dashboard/upcoming-events-list";
import StatsCard from "@/components/global/stats-card";
import { Card, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDashboardStats } from "@/hooks/use-dashboard-stats";
import { AlertTriangle, Calendar, Users } from "lucide-react";

export default function DashboardPage() {
    const { data, isLoading: isLoadingStats } = useDashboardStats();

    if (isLoadingStats) {
        return <DashboardSkeleton />;
    }

    return (
        <div className="flex-1 space-y-4 p-4 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <div className="flex items-center space-x-2">
                    <CreateNewEvent />
                </div>
            </div>

            {/* Stats Cards */}
            {data && (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <StatsCard
                        title="Événements à venir"
                        value={data.stats.hostedEventsCount}
                        description="Dans les 30 prochains jours"
                        icon={
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        }
                    />
                    <StatsCard
                        title="Invitations en attente"
                        value={data.stats.pendingInvitationsCount}
                        description="Réponses attendues"
                        icon={
                            <Users className="h-4 w-4 text-muted-foreground" />
                        }
                    />
                    <StatsCard
                        title="Allergies à gérer"
                        value={data.stats.allergiesCount}
                        description="Attention particulière requise"
                        icon={
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                        }
                    />
                    <StatsCard
                        title="Événements passés"
                        value={data.stats.pastEventsCount}
                        description="Dans les 30 derniers jours"
                        icon={
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        }
                    />
                </div>
            )}

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
