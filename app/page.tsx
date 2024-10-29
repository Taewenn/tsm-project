import { auth } from "@/auth";
import { LoginButton, LogoutButton } from "@/components/auth/AuthButtons";

export default async function Home() {
    const session = await auth();

    return (
        <div className="flex justify-center items-center h-screen w-full">
            <h1>
                {session?.user
                    ? "Authenticated" + session.user.email
                    : "Nobody"}
            </h1>

            <div>{session?.user ? <LogoutButton /> : <LoginButton />}</div>
        </div>
    );
}
