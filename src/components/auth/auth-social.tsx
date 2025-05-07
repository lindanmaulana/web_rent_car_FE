"use client"

import { signIn } from "next-auth/react"
import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { OauthProviders } from "../../../types/auth"
import { Button } from "../ui/button"


export const AuthSocial = () => {
    const handleOauth = (provider: OauthProviders) => {
        signIn(provider, {
            redirect: false,
            callbackUrl: "/"
        })
    }

    return (
        <div className="w-full flex items-center gap-x-2">
            <Button size="lg" className="w-1/2" variant="outline" onClick={() => handleOauth("google")}>
                <FcGoogle className="w-5 h-5" />
            </Button>
            <Button size="lg" className="w-1/2" variant="outline" onClick={() => handleOauth("github")}>
                <FaGithub className="w-5 h-5" />
            </Button>
        </div>
    )
}