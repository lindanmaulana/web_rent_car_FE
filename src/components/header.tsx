"use client"

import { ROUTESPREFIXADMIN } from "@/routes"
import clsx from "clsx"
import { Search, Settings2 } from "lucide-react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { FaHeart } from "react-icons/fa"
import { IoIosNotifications } from "react-icons/io"
import { MdSettings } from "react-icons/md"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

export const Header = () => {
    const session = useSession()
    const urlParams = useSearchParams()
    const pathname = usePathname()

    return (
        <header className={clsx(`w-full flex items-center justify-between p-6 shadow-sm top-0 bg-white z-50`, pathname.startsWith(ROUTESPREFIXADMIN) ? "fixed" : "sticky")}>
            <div className="w-1/2 flex items-center gap-10">
                <Link href={`/?page=${urlParams.get("page")?.toString()}&limit=${urlParams.get("limit")?.toString()}`} className="text-3xl">Morent</Link>
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
                    <AvatarImage src={session.data?.user.image ? `${process.env.NEXT_PUBLIC_BASEURLIMAGE}/${session.data?.user.image}` : "/images/avatar.png"} alt={session.data?.user.name} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </header>
    )
}