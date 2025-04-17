import NextAuth from "next-auth";
import authConfig from "./auth.config";

export const {auth, handlers, signIn, signOut} = NextAuth({
    session: { 
        strategy: "jwt",
        maxAge: 60 * 60 * 24
     },
     jwt: {
        maxAge: 60 * 60 * 24
     },
    ...authConfig
})