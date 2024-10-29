// middleware.ts
import { auth } from "@/auth";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const session = await auth();

    // Vérifie si l'utilisateur est authentifié
    if (!session?.user) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    return NextResponse.next();
}

// Configuration des routes à protéger
export const config = {
    matcher: ["/profile/:path*", "/events/:path*", "/dashboard/:path*"],
};
