import { signOut } from "@/auth"
import { Navbar } from "@/components/dashboard/navbar"
import { ChartNoAxesGantt } from "lucide-react"
import { ReactNode } from "react"

interface PageDashboardLayoutProps {
    children: ReactNode
}

const PageDashboardLayout = ({children}: PageDashboardLayoutProps) => {
    const handleLogout = async () => {
        "use server"
        await signOut({redirectTo: "/auth/login"})
    }
    return (
        <div className="w-full flex h-screen overflow-hidden pt-22">
            <Navbar>
                <button onClick={handleLogout} className="w-full font-semibold text-sm p-2 mx-4 rounded-md flex items-center gap-2 text-red-500"> <ChartNoAxesGantt size={20} /> logout</button>
            </Navbar>
            <div className="flex-1 bg-white-blue p-6 h-full overflow-y-auto">
                {children}
            </div>
        </div>
    )
}

export default PageDashboardLayout