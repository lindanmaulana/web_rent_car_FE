
import { FaHeart } from "react-icons/fa"
import { IoIosNotifications, IoMdPerson } from "react-icons/io"
import { MdSettings } from "react-icons/md"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { useSession } from "next-auth/react"
import { usePathname, useSearchParams } from "next/navigation"
import { AlertConfirmation } from "../alert-confirmation"
import { signOutAction } from "@/actions/signOutAction"
import Image from "next/image"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import Link from "next/link"
import { IoLogOutOutline } from "react-icons/io5"

export const Navbar = () => {
        const session = useSession()
        const urlParams = useSearchParams()
        const pathname = usePathname()

        const handleLogout = async () => {
            await signOutAction()
        }

    return (
         <header className={`w-full flex items-center justify-between p-6 shadow-sm top-0 bg-white z-50`}>
            <h1 className="flex items-center gap-2 text-primary-blue text-xl font-poppins-medium text-shadow">
                <Image src={"/linm-logo.svg"} alt="logo" width={100} height={50} className="w-full h-8"  /> LinmRentalId
            </h1>

            <div className="flex items-center gap-3">   
                <Button variant="outline" className="w-9 h-9 rounded-full"><FaHeart className="text-slate-blue" /></Button>
                <Button variant="outline" className="w-9 h-9 rounded-full"><IoIosNotifications className="text-slate-blue" /></Button>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <MdSettings className="w-9 h-9 p-2 text-slate-blue rounded-full border border-primary/20" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>
                            <Link href={"/"} className="flex items-center gap-1"><IoMdPerson className="text-primary-blue" /> Profile</Link>
                        </DropdownMenuLabel>
                        <DropdownMenuLabel>
                            <AlertConfirmation
                                title="Apakah anda yakin ingin logout ?"
                                description="Anda akan keluar dari akun anda perlu login kembali untuk melanjutkan"
                                handleConfirm={handleLogout}
                                >
                                <button className="cursor-pointer flex items-center gap-1"><IoLogOutOutline className="text-red-500" /> Logout</button>
                            </AlertConfirmation>
                        </DropdownMenuLabel>
                    </DropdownMenuContent>
                </DropdownMenu>
                
                <Avatar className="w-8 h-8">
                    <AvatarImage src={session.data?.user.image ? `${process.env.NEXT_PUBLIC_BASEURLIMAGE}/${session.data?.user.image}` : "/images/avatar.png"} alt={session.data?.user.name} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </header>
    )
}