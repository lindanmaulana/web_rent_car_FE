import { signOut } from "@/auth"
import { ChartNoAxesGantt } from "lucide-react"

export const NavbarFooter = () => {
    const handleLogout = async () => {
        await signOut({redirectTo: "/auth/login"})
    }

    return (
        <div className={`w-full hover:bg-red-500 rounded-md scale-110 transition-all duration-400 ease-in-out px-2 py-1 text-primary/50 hover:text-white`}>
            <form onSubmit={(e) => {e.preventDefault(); handleLogout()}} className="flex items-center gap-2">
                <ChartNoAxesGantt size={20} />
                <button type="submit" className="text-sm">logout</button>
            </form>
        </div>
    )
}