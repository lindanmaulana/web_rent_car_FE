"use client"

import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { ROUTESAUTH, ROUTESPREFIXADMIN } from "@/routes"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"
import { Toaster } from "sonner"


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            // suspense: true,
            // useErrorBoundary: true
        },
    }
})

interface ClientSessionProviderProps {
    children: ReactNode
    // session: Session | null
}
const ClientSessionProvider = ({children}: ClientSessionProviderProps) => {
    const pathname = usePathname()

    return (
        <SessionProvider refetchOnWindowFocus={false}>
            <QueryClientProvider client={queryClient}>
                <Toaster richColors position="top-center" />
                <div className="min-h-screen flex flex-col bg-white-blue">
                    {!ROUTESAUTH.includes(pathname) && (
                        <Header />
                    )}
                    <main className="flex-1">
                        {children}
                    </main>
                    {!pathname.startsWith(ROUTESPREFIXADMIN) && !ROUTESAUTH.includes(pathname) && (
                        <Footer />
                    )}
                </div>
            </QueryClientProvider>
        </SessionProvider>
    )
}

export default ClientSessionProvider