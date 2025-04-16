"use client"

import { useCarGetOne } from "@/hooks/car"
import { useParams } from "next/navigation"
import { CarRentalUpdate } from "./update-car"
import { toast } from "sonner"

const PageDashboardCarRentalUpdate = () => {
    const {id} = useParams<{id: string}>()
    const {data, isLoading, isError, error} = useCarGetOne({id})

    if(isLoading) return toast("Loading data...")

    if(isError) return toast(error?.message)

    return (
        <CarRentalUpdate idCar={id} dataCar={data} />
    )
}

export default PageDashboardCarRentalUpdate