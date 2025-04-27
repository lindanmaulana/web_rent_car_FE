import NextAuth from "next-auth";
import authConfig from "./auth.config";

export const {auth, handlers, signIn, signOut} = NextAuth({
    session: { 
        strategy: "jwt",
        maxAge: 5 * 60,
        updateAge: 5 * 60
    },
    jwt: {
        maxAge: 5 * 60
    },
    ...authConfig,
})