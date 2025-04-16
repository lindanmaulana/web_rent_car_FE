// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth"
import { DefaultJWT } from "next-auth/jwt"
import { AuthRole } from "./auth"

declare module "next-auth" {
    interface Session {
        user: {
            id: string
            email: string
            name: string
            role: AuthRole
            image: string
            provider: string | ""
            providerAccountId: string | ""
            token: string
        }
    }

    interface User {
        id: string
        email: string
        name: string
        role: AuthRole
        image: string
        provider: string | ""
        providerAccountId: string | ""
        token: string
    }
}

// interface Ui
declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        id: string
        email: string
        name: string
        role: AuthRole
        image: string
        provider: string | ""
        providerAccountId: string | ""
        token: string
    }
}