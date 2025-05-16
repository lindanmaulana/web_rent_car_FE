"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { RiFunctionAddFill } from "react-icons/ri"

export const DashboardMainCarBrandHeader = () => {
    const pathname = usePathname()
    return (
        <div className="w-full flex items-center justify-between">
            <div></div>
            <Button asChild>
                <Link href={`${pathname}/add`} className="flex items-center gap-2"><RiFunctionAddFill /> Add</Link>
            </Button>
        </div>  
    )
}