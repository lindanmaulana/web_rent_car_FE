"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { RiFunctionAddFill } from "react-icons/ri"

export const CarCategoryHeader = () => {
    const urlParams = useSearchParams()
    const pathname = usePathname()

    return (
        <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Car Category</h2>
            <Button asChild>
                <Link href={`${pathname}/add?${urlParams.toString()}`} className="flex items-center gap-2"><RiFunctionAddFill /> Add</Link>
            </Button>
        </div>
    )
}