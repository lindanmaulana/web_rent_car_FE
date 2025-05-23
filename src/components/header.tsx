"use client"

import { Search, Settings2 } from "lucide-react"
import { useSession } from "next-auth/react"
import { FaHeart } from "react-icons/fa"
import { IoIosNotifications } from "react-icons/io"
import { MdSettings } from "react-icons/md"
import { LoadingUi } from "./feedbacks/loading-ui"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

export const Header = () => {
    const session = useSession()
    
    if(session.status === "loading") return <LoadingUi />
    return (
        <header className="w-full flex items-center justify-between p-6 shadow-sm sticky top-0 bg-white z-50">
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
                    <AvatarImage src={session.data?.user.image ? `${process.env.NEXT_PUBLIC_BASEURLIMAGE}/${session.data?.user.image}` : "/images/avatar.png"} alt={session.data?.user.name} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </header>
    )
}