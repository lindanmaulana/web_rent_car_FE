"use client"

import { AuthOauth } from "@/actions/auth"
import { useMutation } from "@tanstack/react-query"
import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { OauthProviders } from "../../../types/auth"
import { Button } from "../ui/button"
import { UtilsErrorConsumeAPI } from "@/utils/errors"
import { signIn } from "next-auth/react"


export const AuthSocial = () => {

    // const {mutate} = useMutation({
    //     mutationKey: ['authOauth'],
    //     mutationFn: (provider: OauthProviders) => AuthOauth(provider)
    // })

    // const handleOauth = (provider: OauthProviders) => {
    //     mutate(provider,{
    //         onSuccess: (data) => {
    //                 console.log({data})
    //         },

    //         onError: (err) => {
    //             console.log(UtilsErrorConsumeAPI(err))
    //         }
    //     })
    // }

    const handleOauth = (provider: OauthProviders) => {
        signIn(provider, {
            redirect: true,
            callbackUrl: "/"
        })
    }

    return (
        <div className="w-full flex items-center gap-x-2">
            <Button size="lg" className="w-1/2" variant="outline">
                <FcGoogle className="w-5 h-5" />
            </Button>
            <Button size="lg" className="w-1/2" variant="outline" onClick={() => handleOauth("github")}>
                <FaGithub className="w-5 h-5" />
            </Button>
        </div>
    )
}