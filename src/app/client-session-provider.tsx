"use client"

import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { BASEDASHBOARD } from "@/const/route"
import { ROUTESAUTH } from "@/routes"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
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
}
const ClientSessionProvider = ({children}: ClientSessionProviderProps) => {
    const pathname = usePathname()

    return (
        <SessionProvider refetchOnWindowFocus={false}>
            <QueryClientProvider client={queryClient}>
                <Toaster richColors position="top-center" />
                {!ROUTESAUTH.includes(pathname) && !pathname.startsWith(BASEDASHBOARD) && (
                        <Navbar />
                    )}
                <section>
                    {children}
                </section>
                {!ROUTESAUTH.includes(pathname) && !pathname.startsWith(BASEDASHBOARD) && (
                        <Footer />
                )}
            </QueryClientProvider>
        </SessionProvider>
    )
}

export default ClientSessionProvider