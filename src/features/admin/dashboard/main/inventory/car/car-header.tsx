"use client"

import { SkeletonCarHeader } from "@/components/dashboard/skeleton/car/skeleton-car-header"
import { ErrorUi } from "@/components/feedbacks/error-ui"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCarCategoryGetAll } from "@/hooks/car-category"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { RiFunctionAddFill } from "react-icons/ri"
import { CARSEATS, CARSTATUS, CARYEAR } from "../../../../../../../types/car"

const DEFAULTVALUE = {
    category: "reset",
    seats: "reset",
    status: "reset",
    year: "reset"
}

interface SearchParams {
    category: string
    seats: string
    status: string
    year: string
}

export const DashboardMainCarHeader = () => {
    const paramsRoute = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()
    const {data: dataCarCategory, isLoading, isError, error} = useCarCategoryGetAll()

    const actionParamsRoute = useMemo(() => ({
        category: paramsRoute.get("category") || DEFAULTVALUE.category,
        seats: paramsRoute.get("seats") || DEFAULTVALUE.seats,
        status: paramsRoute.get("status") || DEFAULTVALUE.status,
        year: paramsRoute.get("year") || DEFAULTVALUE.year,
    }), [paramsRoute])

    const [params, setParams] = useState<SearchParams>(actionParamsRoute)

    useEffect(() => {
        if(
            params.seats !== actionParamsRoute.seats ||
            params.status !== actionParamsRoute.status ||
            params.year !== actionParamsRoute.year) {
                setParams(actionParamsRoute)
            }
    }, [actionParamsRoute, params])

    const handleParams = (key: string, value: string) => {
        const paramsURL = new URLSearchParams(window.location.search)
        
        if(value === "reset") {
            setParams({...params, [key]: value})
            paramsURL.delete(key)
        } else {
            setParams({...params, [key]: value})
            paramsURL.set(key, value)
        }
        
        router.push(`${pathname}?${paramsURL.toString()}`)
    }

    const handleResetParams = () => {
        setParams(DEFAULTVALUE)

        router.push(pathname)
    } 

    if(isLoading) return <SkeletonCarHeader />

    if(isError) return <ErrorUi message={error.message} />

    const isParamsSeats: boolean = params.seats !== "reset" && !CARSEATS.includes(params.seats)
    return (
        <div className="flex items-center justify-between">
            <div className="w-2/3 flex items-center gap-3">
                <Select onValueChange={(e) => handleParams("category", e)} value={params.category}>
                    <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Car Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="reset">Car Category</SelectItem>
                        {dataCarCategory.data?.map(carCategory => (
                            <SelectItem key={carCategory.id} value={carCategory.id}>{carCategory.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select onValueChange={(e) => handleParams("seats", e)} value={params.seats}>
                    <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Seats" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="reset">Seats</SelectItem>
                        {CARSEATS?.map(seat => (
                            <SelectItem key={seat} value={seat}>{seat}</SelectItem>
                        ))}

                        {isParamsSeats && <SelectItem value={params.seats}>{params.seats}</SelectItem> }
                    </SelectContent>
                </Select>
                <Select onValueChange={(e) => handleParams("year", e)} value={params.year}>
                    <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="reset">Year</SelectItem>
                        {CARYEAR?.map(year => (
                            <SelectItem key={year} value={year}>{year}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select onValueChange={(e) => handleParams("status", e)} value={params.status}>
                    <SelectTrigger>
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="reset">Status</SelectItem>
                        {CARSTATUS?.map(status => (
                            <SelectItem key={status} value={status.toUpperCase()} className="capitalize">{status}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Button size="sm" variant="destructive" className="text-sm rounded" onClick={handleResetParams}>Reset</Button>
            </div>
            <div>
                <Button size="sm" asChild>
                    <Link href="/dashboard/inventory/car/add" className="flex items-center gap-2"><RiFunctionAddFill /> Add</Link>
                </Button>
            </div>
        </div>
    )
}