import { auth } from "@/auth"
import { ReactNode } from "react"
import { SessionProvider } from "next-auth/react"

interface SessionAppProps {
    children: ReactNode
}
const SessionApp = async ({children}: SessionAppProps) => {
    const session = await auth()
    return (
        <SessionProvider refetchOnWindowFocus={false} session={session}>
            {children}
        </SessionProvider>
    )
}

export default SessionApp