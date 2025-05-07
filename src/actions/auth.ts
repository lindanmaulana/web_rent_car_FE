"use server"

import { signIn } from "@/auth";
import { LoginSchema, typeLoginSchema } from "@/schemas/auth";
import { UtilsErrorAuthentication } from "@/utils/errors";
import { OauthProviders } from "../../types/auth";

export const loginCredentials = async (values: typeLoginSchema) => {
    const validatedFields = LoginSchema.safeParse(values)

    if(!validatedFields.success) return {error: "Invalid fields!"}

    const {email, password} = validatedFields.data

    try {
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        })

        console.log({resultAction: result})

        return result
    } catch (err) {
        console.log({err})
        throw new Error(UtilsErrorAuthentication(err))
    }
}  

export const AuthOauth = async (provider: OauthProviders) => {
    try {
        const result = await signIn(provider, {
            redirect: true,
            callbackUrl: "/"
        })

        return result
    } catch (err) {
        throw new Error(UtilsErrorAuthentication(err))
    }
}

export const AuthGithub = async () => {
    try {
        const result = await signIn("github", {
            redirect: false,
        })

        return result
    } catch (err) {
        throw new Error(UtilsErrorAuthentication(err))
    }
}