"use client"

import { useCarGetAll } from "@/hooks/car"
import { useToastSmart } from "@/hooks/toast/useToastSmart"
import { useState } from "react"
import { DashboardMainCarHeader } from "./car-header"
import { DashboardMainCarItem } from "./car-item"
import { LoadingUi } from "@/components/feedbacks/loading-ui"
import { ErrorUi } from "@/components/feedbacks/error-ui"

export const DashboardMainCar = () => {
    const [params, setParams] = useState<string>("")
    const {data, isLoading, isError, error} = useCarGetAll({params})

    useToastSmart({isLoading, isError, error: error?.message})
   
    if(isLoading) return LoadingUi({message: "Loading data car..."})

    if(isError) return ErrorUi({message: error?.message})

    return (
        <div className="flex flex-col gap-4">
            <DashboardMainCarHeader setParams={setParams} />
            <DashboardMainCarItem data={data} />
        </div>
    )
}