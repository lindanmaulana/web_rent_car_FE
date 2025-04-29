"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ROUTESAUTH } from "@/routes"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Search, Settings2 } from "lucide-react"
import { useSession } from "next-auth/react"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"
import { FaHeart } from "react-icons/fa"
import { IoIosNotifications } from "react-icons/io"
import { MdSettings } from "react-icons/md"
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

interface AppProps {
    children: ReactNode
}
const App = ({children}: AppProps) => {
    const {data, status} = useSession()
    const pathname = usePathname()

    if(status === "loading") return null

    return (
        <QueryClientProvider client={queryClient}>
            <Toaster richColors position="top-center" />
            {!ROUTESAUTH.includes(pathname) && (
                <header className="w-full flex items-center justify-between p-6 shadow-sm fixed top-0 bg-white">
                <div className="w-1/2 flex items-center gap-10">
                    <h3 className="text-3xl">Morent</h3>
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
                        <Input placeholder="Search something here" type="text" className="px-10 rounded-full" />
                        <Settings2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5" />
                    </div>
                </div>
                <div className="flex items-center gap-3">   
                    <Button variant="outline" className="w-9 h-9 rounded-full"><FaHeart className="text-slate-blue" /></Button>
                    <Button variant="outline" className="w-9 h-9 rounded-full"><IoIosNotifications className="text-slate-blue" /></Button>
                    <Button variant="outline" className="w-9 h-9 rounded-full"><MdSettings className="text-slate-blue" /></Button>
                    <Avatar className="w-8 h-8">
                        <AvatarImage src={data?.user.image ? `${process.env.NEXT_PUBLIC_BASEURLIMAGE}/${data.user.image}` : "/images/avatar.png"} alt={data?.user.name} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>  
                </header>
            )}
            <main>
                {children}
            </main>
            <footer></footer>
        </QueryClientProvider>
    )
}

export default App