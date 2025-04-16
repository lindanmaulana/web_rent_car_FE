"use client"

import { useCarGetAll } from "@/hooks/car"
import { useState } from "react"
import { toast } from "sonner"
import { DashboardMainCarHeader } from "./car-header"
import { DashboardMainCarItem } from "./car-item"

export const DashboardMainCar = () => {
    const [params, setParams] = useState<string>("")
    const {data, isLoading, isError, error} = useCarGetAll({params})

    if(isLoading) return toast("Loading data...")

    if(isError) return toast(error?.message)

    return (
        <div className="flex flex-col gap-4">
            <DashboardMainCarHeader setParams={setParams} />
            <DashboardMainCarItem data={data} />
        </div>
    )
}