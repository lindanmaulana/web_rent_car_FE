"use client"

import { AuthOauth } from "@/actions/oauth"
import { UtilsErrorConsumeAPI } from "@/utils/errors"
import { useMutation } from "@tanstack/react-query"
import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { toast } from "sonner"
import { OauthProviders } from "../../../types/auth"
import { Button } from "../ui/button"


export const AuthSocial = () => {
    const {mutate} = useMutation({
        mutationKey: ['authOauth'],
        mutationFn: (provider: OauthProviders) => AuthOauth(provider)
    })

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
        mutate(provider, {
            onSuccess: (data) => {
                toast.success("Success")
            },

            onError: (err) => {
                toast.error(UtilsErrorConsumeAPI(err))
            }
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