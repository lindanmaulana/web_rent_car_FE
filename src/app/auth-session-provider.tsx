import { auth } from "@/auth"
import { ReactNode } from "react"
import ClientSessionProvider from "./client-session-provider"

interface AuthSessionProviderProps {
    children: ReactNode
}
const AuthSessionProvider = async ({children}: AuthSessionProviderProps) => {
    const session = await auth()
    
    return (
        <ClientSessionProvider session={session}>
            {children}
        </ClientSessionProvider>
    )
}

export default AuthSessionProvider