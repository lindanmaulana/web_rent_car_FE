"use client"
import { DatePicker } from "@/components/date-picker"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import debounce from "lodash.debounce"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import React, { useMemo } from "react"

const DEFAULTRENTALDATE = {
    start_date: "start_date",
    end_date: "end_date"
}

export const DashboardMainRentalHeader = () => {
    const pathname = usePathname()
    const router = useRouter()
    const urlParams = useSearchParams()

     const debounceSearch = useMemo(() => debounce((key: string, param: string) => {
        const urlParam = new URLSearchParams(window.location.search)
        
        if(param) {
            urlParam.set(key, param)
        } else {
            urlParam.delete(key)
        }

        router.replace(`${pathname}?${urlParam.toString()}`)
    }, 500) ,[pathname, router])

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value

        debounceSearch("keyword", value)
    }

    const handleChangeDate = (key: string, date?: Date): void => {
        const urlParams = new URLSearchParams(window.location.search)

        if(date) {
            urlParams.set(key, date.toISOString())
        } else {
            urlParams.delete(key)
        }

        router.replace(`${pathname}?${urlParams.toString()}`)
    }

    const handleChangeStatus = (key: string, status: string) => {
        const urlParams = new URLSearchParams(window.location.search)

        if(status === "reset") {
            urlParams.delete(key)
        } else {
            urlParams.set(key, status)
        }

        router.replace(`${pathname}?${urlParams.toString()}`)
    }

    const handleReset = () => {
        router.replace(pathname)
    }

    return (
        <div className="flex items-center justify-between">
            <div className="min-w-1/2 flex items-center gap-3">
                <Input type="text" placeholder="Search by name..." onChange={handleSearch} defaultValue={urlParams?.get("keyword") || ""} />
                <DatePicker title="Mulai sewa" date={urlParams?.get("start_date") ? new Date(urlParams.get("start_date") ?? "") : undefined} setDate={(e) => handleChangeDate(DEFAULTRENTALDATE.start_date, e) } />
                <DatePicker title="Selesai sewa" date={urlParams?.get("end_date") ? new Date(urlParams.get("end_date") ?? "") : undefined} setDate={(e) => handleChangeDate(DEFAULTRENTALDATE.end_date, e) } />
                <Select onValueChange={(e) => handleChangeStatus("status", e)} defaultValue={urlParams?.get("status") || "reset"}>
                    <SelectTrigger>
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="reset">Status</SelectItem>
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="APPROVE">Approve</SelectItem>
                        <SelectItem value="COMPLETED">Completed</SelectItem>
                    </SelectContent>
                </Select>
                <Button variant="destructive" onClick={handleReset}>Reset</Button>
            </div>  
            <div>
                <Button size="sm" asChild>
                    <Link href="/dashboard/rental/add">Add</Link>
                </Button>
            </div>
        </div>
    )
}