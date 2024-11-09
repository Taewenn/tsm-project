"use client";

import { nanoid } from "nanoid";
import React from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { CreateEventDTO } from "@/lib/validations/event";
import { PlusCircleIcon } from "lucide-react";

type FormData = {
    title: string;
    description: string;
    dateTime: string;
    location: string;
    maxGuests: string;
    invitationLink: string;
};

function CreateNewEvent() {
    const [open, setOpen] = React.useState(false);
    const form = useForm({
        defaultValues: {
            title: "",
            description: "",
            dateTime: "",
            location: "",
            maxGuests: "10",
            invitationLink: "",
        },
    });

    const onSubmit = async (data: FormData) => {
        try {
            // Generate a unique invitation link
            const eventData: CreateEventDTO = {
                ...data,
                invitationLink: `invite-${nanoid(10)}`,
                dateTime: data.dateTime,
                maxGuests: parseInt(data.maxGuests),
            };

            // Create the event
            try {
                await fetch("/api/events", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(eventData),
                });
            } catch (error: any) {
                toast({
                    title: "Erreur",
                    description: error,
                    variant: "destructive",
                });
            }

            setOpen(false);
            form.reset();
        } catch (error) {
            console.error("Failed to create event:", error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                    Nouvel évènement <PlusCircleIcon size={16} />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle>Créer un évènement</DialogTitle>
                    <DialogDescription>
                        Créez un nouvel évènement et invitez vos amis ensuite !
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            rules={{ required: "Le titre est requis" }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Titre</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Dîner d'anniversaire..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Donnez plus de détails sur l'événement..."
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="dateTime"
                                rules={{ required: "La date est requise" }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Date et heure</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="datetime-local"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="maxGuests"
                                rules={{
                                    required: "Le nombre d'invités est requis",
                                    min: {
                                        value: 1,
                                        message: "Minimum 1 invité",
                                    },
                                }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Nombre d'invités max
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min="1"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="location"
                            rules={{ required: "Le lieu est requis" }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Lieu</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Adresse de l'événement"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter className="mt-6">
                            <Button type="submit" className="w-full">
                                Créer l'évènement
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default CreateNewEvent;
