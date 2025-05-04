import { auth } from "@/auth"
import { ReactNode } from "react"
import SessionClient from "./sessionClient"

interface SessionAppProps {
    children: ReactNode
}
const SessionApp = async ({children}: SessionAppProps) => {
    const session = await auth()
    return (
        <SessionClient session={session}>
            {children}
        </SessionClient>
    )
}

export default SessionApp