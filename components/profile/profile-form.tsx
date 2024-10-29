"use client";

import { useToast } from "@/hooks/use-toast";
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
import {
    useAddAllergy,
    useAddDietaryPreference,
    useProfile,
    useRemoveAllergy,
    useRemoveDietaryPreference,
    useUpdateProfile,
} from "@/hooks/use-profile";
import type { AllergySeverity } from "@prisma/client";
import { AlertCircle, Loader2, Plus, Save, X } from "lucide-react";
import { useEffect, useState } from "react";

const allergySeverities: { value: AllergySeverity; label: string }[] = [
    { value: "MILD", label: "Léger" },
    { value: "MODERATE", label: "Modéré" },
    { value: "SEVERE", label: "Sévère" },
    { value: "FATAL", label: "Fatal" },
];

export default function ProfilePage() {
    const { toast } = useToast();
    const { data: profile, isLoading } = useProfile();
    const { mutate: updateProfile } = useUpdateProfile();
    const { mutate: addDietaryPreference } = useAddDietaryPreference();
    const { mutate: removeDietaryPreference } = useRemoveDietaryPreference();
    const { mutate: addAllergy } = useAddAllergy();
    const { mutate: removeAllergy } = useRemoveAllergy();

    // Form state
    const [name, setName] = useState("");
    const [newPreference, setNewPreference] = useState("");
    const [newAllergy, setNewAllergy] = useState("");
    const [selectedSeverity, setSelectedSeverity] =
        useState<AllergySeverity>("MODERATE");

    // Initialize form with profile data
    useEffect(() => {
        if (profile) {
            setName(profile.name || "");
        }
    }, [profile]);

    const handleUpdateProfile = async () => {
        updateProfile(
            { name },
            {
                onSuccess: () => {
                    toast({
                        title: "Profil mis à jour",
                        description:
                            "Vos informations ont été enregistrées avec succès.",
                    });
                },
                onError: () => {
                    toast({
                        title: "Erreur",
                        description: "Impossible de mettre à jour le profil.",
                        variant: "destructive",
                    });
                },
            }
        );
    };

    const handleAddPreference = async () => {
        if (!newPreference.trim()) return;

        addDietaryPreference(
            { name: newPreference.trim() },
            {
                onSuccess: () => {
                    setNewPreference("");
                    toast({
                        title: "Préférence ajoutée",
                        description:
                            "Votre préférence alimentaire a été ajoutée.",
                    });
                },
                onError: () => {
                    toast({
                        title: "Erreur",
                        description: "Impossible d'ajouter la préférence.",
                        variant: "destructive",
                    });
                },
            }
        );
    };

    const handleRemovePreference = async (preferenceId: string) => {
        removeDietaryPreference(
            { preferenceId },
            {
                onSuccess: () => {
                    toast({
                        title: "Préférence supprimée",
                        description:
                            "Votre préférence alimentaire a été supprimée.",
                    });
                },
                onError: () => {
                    toast({
                        title: "Erreur",
                        description: "Impossible de supprimer la préférence.",
                        variant: "destructive",
                    });
                },
            }
        );
    };

    const handleAddAllergy = async () => {
        if (!newAllergy.trim()) return;

        addAllergy(
            {
                name: newAllergy.trim(),
                severity: selectedSeverity,
            },
            {
                onSuccess: () => {
                    setNewAllergy("");
                    setSelectedSeverity("MODERATE");
                    toast({
                        title: "Allergie ajoutée",
                        description: "Votre allergie a été enregistrée.",
                    });
                },
                onError: () => {
                    toast({
                        title: "Erreur",
                        description: "Impossible d'ajouter l'allergie.",
                        variant: "destructive",
                    });
                },
            }
        );
    };

    const handleRemoveAllergy = async (allergyId: string) => {
        removeAllergy(
            { allergyId },
            {
                onSuccess: () => {
                    toast({
                        title: "Allergie supprimée",
                        description: "Votre allergie a été supprimée.",
                    });
                },
                onError: () => {
                    toast({
                        title: "Erreur",
                        description: "Impossible de supprimer l'allergie.",
                        variant: "destructive",
                    });
                },
            }
        );
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

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
                            <Input
                                placeholder="Votre nom"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Email
                            </label>
                            <Input
                                type="email"
                                disabled
                                value={profile?.email || ""}
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
                            {profile?.dietaryPreferences?.map((pref) => (
                                <Button
                                    key={pref.id}
                                    variant="outline"
                                    className="flex items-center gap-2"
                                    onClick={() =>
                                        handleRemovePreference(pref.id)
                                    }
                                >
                                    {pref.name}
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
                            {profile?.allergies?.map((allergy) => (
                                <div
                                    key={allergy.id}
                                    className="flex items-center justify-between p-2 border rounded"
                                >
                                    <span>{allergy.name}</span>
                                    <div className="flex items-center gap-2">
                                        <span
                                            className={`text-sm ${
                                                allergy.severity === "FATAL"
                                                    ? "text-red-500"
                                                    : allergy.severity ===
                                                      "SEVERE"
                                                    ? "text-orange-500"
                                                    : allergy.severity ===
                                                      "MODERATE"
                                                    ? "text-yellow-500"
                                                    : "text-green-500"
                                            }`}
                                        >
                                            {
                                                allergySeverities.find(
                                                    (s) =>
                                                        s.value ===
                                                        allergy.severity
                                                )?.label
                                            }
                                        </span>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() =>
                                                handleRemoveAllergy(allergy.id)
                                            }
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
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
                <Button
                    className="w-full sm:w-auto"
                    onClick={handleUpdateProfile}
                >
                    <Save className="h-4 w-4 mr-2" />
                    Enregistrer les modifications
                </Button>
            </div>
        </div>
    );
}
