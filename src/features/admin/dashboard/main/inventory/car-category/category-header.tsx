"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { RiFunctionAddFill } from "react-icons/ri"

export const DashboardMainCategoryHeader = () => {
    return (
        <div className="flex items-center justify-between">
            <div className="min-w-[40%] flex items-center gap-2">
            </div>
            <Button asChild>
                <Link href={'/dashboard/inventory/car-category/add'} className="flex items-center gap-2"><RiFunctionAddFill /> Add</Link>
            </Button>
        </div>
    )
}