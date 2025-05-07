import NextAuth from "next-auth";
import authConfig from "./auth.config";

export const {auth, handlers, signIn, signOut} = NextAuth({
    session: { 
        strategy: "jwt",
        maxAge: 30 * 60,
        // maxAge: 3 * 60,
        updateAge: 30 * 60
    },
    jwt: {
        // maxAge: 5 * 60
        maxAge: 30 * 60
    },
    ...authConfig,
})