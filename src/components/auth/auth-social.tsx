"use client"

import { Button } from "../ui/button"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { AuthGithub } from "@/actions/auth"


export const AuthSocial = () => {

    return (
        <div className="w-full flex items-center gap-x-2">
            <Button size="lg" className="w-1/2" variant="outline">
                <FcGoogle className="w-5 h-5" />
            </Button>
            <Button size="lg" className="w-1/2" variant="outline" onClick={AuthGithub}>
                <FaGithub className="w-5 h-5" />
            </Button>
        </div>
    )
}