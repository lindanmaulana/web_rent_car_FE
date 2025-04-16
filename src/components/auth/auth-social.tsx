"use client"

import { Button } from "../ui/button"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"

interface AuthSocialProps {
    actionGoogle?: () => void
    actionGithub?: () => void
}

export const AuthSocial = ({actionGithub, actionGoogle}: AuthSocialProps) => {
    return (
        <div className="w-full flex items-center gap-x-2">
            <Button size="lg" className="w-1/2" variant="outline" onClick={actionGoogle}>
                <FcGoogle className="w-5 h-5" />
            </Button>
            <Button size="lg" className="w-1/2" variant="outline" onClick={actionGithub}>
                <FaGithub className="w-5 h-5" />
            </Button>
        </div>
    )
}