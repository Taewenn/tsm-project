import ProfilePage from "@/components/profile/profile-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Mon Profil | NomApp",
    description:
        "Gérez vos préférences alimentaires et informations personnelles",
};

export default function Page() {
    return <ProfilePage />;
}
