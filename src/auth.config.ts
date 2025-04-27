import { LoginSchema, OauthSchema, typeLoginSchema } from "@/schemas/auth"
import { UtilsAuthLogin, UtilsAuthOauth } from "@/utils/auth"
import type { Profile } from "@auth/core/types"
import type { Account, NextAuthConfig, Session, User } from "next-auth"
import { JWT } from "next-auth/jwt"
import Credentials from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { oauthGithubConfig, oauthGoogleConfig } from "./privatConfig"
interface jwtParams {
    token: JWT
    user?: User
    account: Account | null
    profile?: Profile
}

interface OauthParams {
    user?: User
    account: Account | null
}

export default {
    providers: [Credentials({
        async authorize(credentials) {
            return await serviceAuthCredentials(credentials as typeLoginSchema)
        }
    }),
    
    GithubProvider({
        clientId: oauthGithubConfig.GITHUB_CLIENT_ID,
        clientSecret: oauthGithubConfig.GITHUB_CLIENT_SECRET,
    }),

    GoogleProvider({
        clientId: oauthGoogleConfig.GOOGLE_CLIENT_ID,
        clientSecret: oauthGoogleConfig.GOOGLE_CLIENT_SECRET
    })
],

    callbacks: {
        async signIn({user, account}) {
            if(account?.provider === "github") {
                const newAccount = await serviceAuthGithub({user, account})

                user.role = newAccount.role
                user.image = newAccount.image
                user.token = newAccount.token
                user.provider = account.provider
                user.providerAccountId = account.providerAccountId

                return newAccount
            }

            if(account?.provider === "google") {
                const newAccount = await serviceAuthGoogle({user, account})
                
                user.role = newAccount.role
                user.image = newAccount.image
                user.token = newAccount.token
                user.provider = account.provider
                user.providerAccountId = account.providerAccountId

                return newAccount
            }

            return true
        },

        async jwt({token, user}: jwtParams) {
                if(user) {
                    token.id = user.id!
                    token.name = user.name!
                    token.email = user.email!
                    token.role = user.role
                    token.image = user.image!
                    token.token = user.token
                }
            return token
        },

        async session({session, token}: {session: Session, token: JWT}) {
            session.user.id = token.id
            session.user.name = token.name
            session.user.email = token.email
            session.user.role = token.role
            session.user.image = token.image
            session.user.token = token.token
            return session
        }
    },
    pages: {
        signIn: "/auth/login",
    }
    
    // cookies: {
    //     sessionToken: {
    //         name: "webrentalmobil",
    //         options: {
    //             httpOnly: true,
    //             sameSite: "none",
    //             secure: process.env.NODE_ENV === "production",
    //             path: "/"
    //         }
    //     }
    // }
} satisfies NextAuthConfig


const serviceAuthCredentials = async (credentials: typeLoginSchema) => {
    const validatedFields = LoginSchema.safeParse(credentials)

    try {
        if(!validatedFields.success) {
            throw new Error("Invalid credentials")
        }

        const newUser = {...validatedFields.data, provider: "credentials"}
        const result = await UtilsAuthLogin(newUser)

        if(!result || result.errors) return null

        return result
    } catch {
        return null
    }
}

const serviceAuthGithub = async ({user}: OauthParams) => {
    const validatedFields = OauthSchema.safeParse(user)

    try {
        if(!validatedFields.success) throw new Error("Invalid credentials")

        const result = await UtilsAuthOauth(validatedFields.data)

        if(!result || result.errors) throw new Error(result.errors)
            
        return result
    } catch {
        return false
    }
}

const serviceAuthGoogle = async ({user}: OauthParams) => {
    const validatedFields = OauthSchema.safeParse(user)

    try {
        if(!validatedFields.success) throw new Error("Invalid credentials")

        const result = await UtilsAuthOauth(validatedFields.data)

        if(!result || result.errors) throw new Error(result.errors)

        return result
    } catch {
        return false
    }
}