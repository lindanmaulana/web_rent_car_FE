import Credentials from "next-auth/providers/credentials"
import { LoginSchema } from "@/schemas/auth"
import { UtilsAuthLogin } from "@/utils/auth"
import type {NextAuthConfig, User, Session} from "next-auth"
import {JWT} from "next-auth/jwt"
  
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
    })],

    callbacks: {
        async jwt({token, user}: {token: JWT, user?: User}) {
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