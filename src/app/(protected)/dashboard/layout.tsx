import { Navbar } from "@/components/dashboard/navbar"
import { ReactNode } from "react"

interface PageDashboardLayoutProps {
    children: ReactNode
}

const PageDashboardLayout = ({children}: PageDashboardLayoutProps) => {
    return (
        <div className="w-full flex h-screen overflow-hidden pt-22">
            <Navbar></Navbar>
            <div className="flex-1 bg-white-blue p-6 h-full overflow-y-auto">
                {children}
            </div>
        </div>
    )
}

export default PageDashboardLayout