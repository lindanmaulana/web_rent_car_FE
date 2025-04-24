import { LoginSchema, OauthSchema, typeLoginSchema } from "@/schemas/auth"
import { UtilsAuthLogin, UtilsAuthOauth } from "@/utils/auth"
import type { Profile } from "@auth/core/types"
import type { Account, NextAuthConfig, Session, User } from "next-auth"
import { JWT } from "next-auth/jwt"
import Credentials from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
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
        clientId: process.env.GITHUB_CLIENT_ID as string,
        clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),

    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
],

    callbacks: {
        async signIn({user, account}) {
            if(account?.provider === "github") {
                return serviceAuthGithub({user, account})
            }

            if(account?.provider === "google") {
                return serviceAuthGoogle({user, account})
            }

            return true
        },

        async jwt({token, user}: jwtParams) {
                if(user) {
                    token.id = user.id!
                    token.email = user.email!
                    token.role = user.role
                    token.token = user.token
                }

                console.log({token})
                console.log({user})

            return token
        },

        async session({session, token}: {session: Session, token: JWT}) {
            session.user.id = token.id
            session.user.name = token.name
            session.user.email = token.email
            session.user.role = token.role
            session.user.image = token.image
            session.user.provider = token.provider
            session.user.providerAccountId = token.providerAccountId
            session.user.token = token.token

            return session
        }
    }
} satisfies NextAuthConfig


const serviceAuthCredentials = async (credentials: typeLoginSchema) => {
    const validatedFields = LoginSchema.safeParse(credentials)

    try {
        if(validatedFields.success) {
            const result = await UtilsAuthLogin(validatedFields.data)

            if(!result || result.errors) return null

            return result
        }

        return null
    } catch {
        return null
    }
}

const serviceAuthGithub = async ({user}: OauthParams) => {
    const validatedFields = OauthSchema.safeParse(user)

    try {
        if(validatedFields.success) {
            const result = await UtilsAuthOauth(validatedFields.data)

            if(!result || result.errors) throw new Error(result.errors)
            
            return result
        }

        return false
    } catch {
        return false
    }
}

const serviceAuthGoogle = async ({user}: OauthParams) => {
    const validatedFields = OauthSchema.safeParse(user)

    try {
        if(validatedFields.success) {
            const result = await UtilsAuthOauth(validatedFields.data)

            if(!result || result.errors) throw new Error(result.errors)

            return result
        }

        return false
    } catch {
        return false
    }
}