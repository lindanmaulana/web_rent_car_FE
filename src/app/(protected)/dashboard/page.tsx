import { signOut } from "@/auth"
import { DashboardMain } from "@/components/dashboard/main/dashboard"
import { Button } from "@/components/ui/button"

const PageDashboard = () => {
    const handleLogout = async () => {
        "use server"
        await signOut({redirectTo: "/auth/login"})
    }
    return (
        <>
            <h2>Page dashboard</h2>
            <Button onClick={handleLogout}>Logout</Button>
            <DashboardMain />
        </>
    )
}

export default PageDashboard