import { ReactNode } from "react"
import ClientSessionProvider from "./client-session-provider"

interface AuthSessionProviderProps {
    children: ReactNode
}
const AuthSessionProvider = ({children}: AuthSessionProviderProps) => {
    return (
        <ClientSessionProvider >
            {children}
        </ClientSessionProvider>
    )
}

export default AuthSessionProvider