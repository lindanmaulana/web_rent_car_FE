"use client"

import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"

interface SessionClientProps {
    children: ReactNode
    session: Session | null
}
const SessionClient = ({children, session}: SessionClientProps) => {
    return (
        <SessionProvider refetchOnWindowFocus={false} session={session}>
            {children}
        </SessionProvider>
    )
}

export default SessionClient