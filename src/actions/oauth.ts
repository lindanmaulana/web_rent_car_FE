"use client"

import { signIn } from "next-auth/react"
import { OauthProviders } from "../../types/auth"
import { UtilsErrorAuthentication } from "@/utils/errors"

export const AuthOauth = async (provider: OauthProviders) => {
    try {
        const result = await signIn(provider, {
            redirect: false
        })

        return result
    } catch (err) {
        throw new Error(UtilsErrorAuthentication(err))
    }
}