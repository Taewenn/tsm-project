"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useProfile, useUpdateProfile } from "@/hooks/use-profile";
import type { AllergySeverity } from "@prisma/client";
import { AlertCircle, Plus, Save, X } from "lucide-react";
import { useState } from "react";

const allergySeverities: { value: AllergySeverity; label: string }[] = [
    { value: "MILD", label: "Léger" },
    { value: "MODERATE", label: "Modéré" },
    { value: "SEVERE", label: "Sévère" },
    { value: "FATAL", label: "Fatal" },
];

const commonDietaryPreferences = [
    "Végétarien",
    "Végan",
    "Sans gluten",
    "Sans lactose",
    "Halal",
    "Kasher",
    "Pescétarien",
];

export default function ProfilePage() {
    const { data: profile, isLoading } = useProfile();
    const { mutate: updateProfile } = useUpdateProfile();

    const [newPreference, setNewPreference] = useState("");
    const [newAllergy, setNewAllergy] = useState("");
    const [selectedSeverity, setSelectedSeverity] =
        useState<AllergySeverity>("MODERATE");

    const handleAddPreference = async () => {
        // TODO: Implement API call
        console.log("Adding preference:", newPreference);
        setNewPreference("");
    };

    const handleAddAllergy = async () => {
        // TODO: Implement API call
        console.log("Adding allergy:", newAllergy, selectedSeverity);
        setNewAllergy("");
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Mon Profil</h1>

            {/* Informations de base */}
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Informations personnelles</CardTitle>
                    <CardDescription>
                        Gérez vos informations de profil
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Nom
                            </label>
                            <Input placeholder="Votre nom" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Email
                            </label>
                            <Input
                                type="email"
                                disabled
                                placeholder="votre@email.com"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Préférences alimentaires */}
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Préférences alimentaires</CardTitle>
                    <CardDescription>
                        Ajoutez vos régimes alimentaires et restrictions
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {/* Liste des préférences actuelles */}
                        <div className="flex flex-wrap gap-2">
                            {commonDietaryPreferences.map((pref) => (
                                <Button
                                    key={pref}
                                    variant="outline"
                                    className="flex items-center gap-2"
                                >
                                    {pref}
                                    <X className="h-4 w-4" />
                                </Button>
                            ))}
                        </div>

                        {/* Ajouter une préférence */}
                        <div className="flex gap-2">
                            <Input
                                placeholder="Ajouter une préférence"
                                value={newPreference}
                                onChange={(e) =>
                                    setNewPreference(e.target.value)
                                }
                            />
                            <Button onClick={handleAddPreference}>
                                <Plus className="h-4 w-4 mr-2" />
                                Ajouter
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Allergies */}
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Allergies</CardTitle>
                    <CardDescription>
                        Gérez vos allergies et leur sévérité
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {/* Alert pour les allergies graves */}
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                                Pour les allergies sévères, nous recommandons
                                d&apos;en informer directement l&apos;hôte de
                                l&apos;événement.
                            </AlertDescription>
                        </Alert>

                        {/* Liste des allergies actuelles */}
                        <div className="space-y-2">
                            {/* TODO: Mapper les vraies allergies */}
                            <div className="flex items-center justify-between p-2 border rounded">
                                <span>Arachides</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-red-500 text-sm">
                                        Sévère
                                    </span>
                                    <Button variant="ghost" size="sm">
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Ajouter une allergie */}
                        <div className="flex gap-2">
                            <Input
                                placeholder="Nom de l'allergie"
                                value={newAllergy}
                                onChange={(e) => setNewAllergy(e.target.value)}
                            />
                            <Select
                                value={selectedSeverity}
                                onValueChange={(value) =>
                                    setSelectedSeverity(
                                        value as AllergySeverity
                                    )
                                }
                            >
                                <SelectTrigger className="w-32">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {allergySeverities.map((severity) => (
                                        <SelectItem
                                            key={severity.value}
                                            value={severity.value}
                                        >
                                            {severity.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Button onClick={handleAddAllergy}>
                                <Plus className="h-4 w-4 mr-2" />
                                Ajouter
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button className="w-full sm:w-auto">
                    <Save className="h-4 w-4 mr-2" />
                    Enregistrer les modifications
                </Button>
            </div>
        </div>
    );
}
