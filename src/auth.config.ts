import { LoginSchema, OauthSchema } from "@/schemas/auth"
import { UtilsAuthLogin, UtilsAuthOauth } from "@/utils/auth"
import type { Profile } from "@auth/core/types"
import type { Account, NextAuthConfig, Session, User } from "next-auth"
import { JWT } from "next-auth/jwt"
import Credentials from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
interface jwtParams {
    token: JWT
    user?: User
    account: Account | null
    profile?: Profile
}

type Awaitable<T> = T | Promise<T>
  
export default {
    providers: [Credentials({
        async authorize(credentials) {
            const validatedFields = LoginSchema.safeParse(credentials)

            if(validatedFields.success) {
                const user = await UtilsAuthLogin(validatedFields.data)
                if(!user || user.errors) return null

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    image: user.image,
                    provider: user.provider,
                    providerAccountId: user.providerAccountId,
                    token: user.token,
                }
            }
            

            return null
        }
    }),
    GithubProvider({
        clientId: process.env.GITHUB_CLIENT_ID as string,
        clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        profile(profil) {
            return {
                id: profil.id.toString(),
                image: profil.avatar_url,
                email: profil.email,
                name: profil.name,
                provider: "github",
                providerAccountId: profil.id.toString(),
                role: "USER",
                token: ""
            }
        }
    }) 
],

    callbacks: {
        // async jwt({token, user}: {token: JWT, user?: User}) {
        //     if(user) {
        //         token.id = user.id!
        //         token.name = user.name!
        //         token.email = user.email!
        //         token.role = user.role
        //         token.image = user.image!
        //         token.provider = user.provider
        //         token.providerAccountId = user.providerAccountId
        //         token.token = user.token
        //     }

        //     return token
        // },

        async jwt({token, user, account}: jwtParams) {
            if(account?.provider === "credentials") {
                if(user) {
                    token.id = user.id!
                    token.name = user.name!
                    token.email = user.email!
                    token.role = user.role
                    token.image = user.image!
                    token.provider = user.provider
                    token.providerAccountId = user.providerAccountId
                    token.token = user.token
                }
            }

            if(account?.provider === "github") {
                if(user) {
                    try {
                        const validatedFields = OauthSchema.safeParse(user)
                        if(validatedFields.success) {
                            const user = await UtilsAuthOauth(validatedFields.data)
                            if(!user || user.errors) return null

                            token.id = user.id
                            token.name = user.name
                            token.email = user.email
                            token.role = user.role
                            token.image = user.image
                            token.provider = user.provider
                            token.providerAccountId = user.providerAccountId
                            token.token = user.token
                        }
                    } catch {
                        return null
                    }


                    // token.id = account.providerAccountId,
                    // token.name = user?.name ?? "",
                    // token.email = user?.email ?? "",
                    // token.image = profile?.picture ?? "",
                    // token.provider = account.provider,
                    // token.providerAccountId = account.providerAccountId
                }
                // const userGithub: UserGithub = {
                //     id: account.providerAccountId,
                //     name: user?.name ?? "",
                //     email: user?.email ?? "",
                //     image: profile?.picture ?? "",
                //     provider: account.provider,
                //     providerAccountId: account.providerAccountId
                // }
            }

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