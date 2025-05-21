"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { RiFunctionAddFill } from "react-icons/ri"

export const DashboardMainCarBrandHeader = () => {
    const pathname = usePathname()
    const urlParams = useParams()
    return (
        <div className="w-full flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Car Brand</h2>
            <Button asChild>
                <Link href={`${pathname}/add?${urlParams.toString()}`} className="flex items-center gap-2"><RiFunctionAddFill /> Add</Link>
            </Button>
        </div>  
    )
}