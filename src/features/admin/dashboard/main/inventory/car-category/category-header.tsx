"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import debounce from "lodash.debounce"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import React, { useMemo, useState } from "react"
import { RiFunctionAddFill } from "react-icons/ri"

export const DashboardMainCategoryHeader = () => {
    const router = useRouter()
    const pathname = usePathname()
    const [keyword, setKeyword] = useState<string>("")

    const debounceSearch = useMemo(() => debounce((keyword: string) => {
        const params = new URLSearchParams(window.location.search)
        if(keyword) {
            params.set("keyword", keyword)
        } else {
            params.delete("keyword")
        }

        router.push(`${pathname}?${params.toString()}`)
    }, 1000), [pathname, router])

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setKeyword(value)
        debounceSearch(value)
    }

    const handleReset = () => {
        debounceSearch("")
        setKeyword("")
    }

    return (
        <div className="flex items-center justify-between">
            <div className="min-w-[40%] flex items-center gap-2">
                <Input type="text" onChange={handleSearch} value={keyword} name="name-category" placeholder="Search car category name..." />
                <Button onClick={handleReset} size="sm" variant="destructive" className="text-sm rounded">Reset</Button>
            </div>
            <Button asChild>
                <Link href={'/dashboard/inventory/car-category/add'} className="flex items-center gap-2"><RiFunctionAddFill /> Add</Link>
            </Button>
        </div>
    )
}