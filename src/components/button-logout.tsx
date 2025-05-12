import { signOut } from "@/auth"
import { AlertConfirmation } from "./alert-confirmation"
import { ChartNoAxesGantt } from "lucide-react"

export const ButtonLogout = () => {
    const handleLogout = async () => {
        "use server"
        await signOut({redirectTo: "/auth/login"})
    }
    return (
        <AlertConfirmation
          title="Apakah anda yakin ingin logout ?"
          description="Anda akan keluar dari akun anda perlu login kembali untuk melanjutkan"
          handleConfirm={handleLogout}
        >
          <button className="cursor-pointer w-full font-semibold text-sm px-5 rounded-md flex items-center gap-2 text-red-500">
            {" "}
            <ChartNoAxesGantt size={20} /> logout
          </button>
        </AlertConfirmation>
    )
}