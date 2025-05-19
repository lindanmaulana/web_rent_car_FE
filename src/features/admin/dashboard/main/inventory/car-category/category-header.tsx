"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { RiFunctionAddFill } from "react-icons/ri"

export const DashboardMainCategoryHeader = () => {
    return (
        <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Car Category</h2>
            <Button asChild>
                <Link href={'/dashboard/inventory/car-category/add'} className="flex items-center gap-2"><RiFunctionAddFill /> Add</Link>
            </Button>
        </div>
    )
}