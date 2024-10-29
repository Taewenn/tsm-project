"use client";

import { signIn, signOut } from "next-auth/react";

export const LoginButton = () => {
    return (
        <button
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            onClick={() => signIn()}
        >
            Sign in
        </button>
    );
};

export const LogoutButton = () => {
    return (
        <button
            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
            onClick={() => signOut()}
        >
            Sign out
        </button>
    );
};
