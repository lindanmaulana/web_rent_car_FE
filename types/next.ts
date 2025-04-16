import { NextRequest } from "next/server";
import { AuthRole } from "./auth";

export interface NextRequestCustom extends NextRequest {
    auth?: {
        user: {
            id: string,
            email: string,
            name: string,
            role: AuthRole,
            provider: string | "",
            providerAccountId: string | "",
            token: string
        },

        expires: string
    }
}