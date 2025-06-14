"use client"

import { ErrorUi } from "@/components/feedbacks/error-ui"
import { useCarGetAll } from "@/hooks/car"
import { APIURLIMAGE } from "@/publicConfig"
import { UtilsFormatCurrency } from "@/utils/helpers/formatCurrency"
import { useSearchParams } from "next/navigation"
import { CarListSkeleton } from "./car-list-skeleton"
import { CardCar } from "./card-car"

export const CarList = () => {
    const urlParams = useSearchParams()
    const carGetAll = useCarGetAll({params: urlParams.toString()})

    if(carGetAll.isLoading) return <CarListSkeleton />
    if(carGetAll.isError) return <ErrorUi message={carGetAll.error?.message} />

    console.log({carGetAll: carGetAll.data})
    return (
        <div className="grid grid-cols-4 gap-4">
            {carGetAll.data?.data.map(car => {
                const price = UtilsFormatCurrency(Number(car.price_per_day))
                return (
                <CardCar key={car.id} id={car.id} model={car.model} brand={car.brand.name} category={car.category.name} image={car.thumbnail ? `${APIURLIMAGE}${car.thumbnail}` : "/images/car-default.png"} year={car.year ?? ""} seats={car.seats ?? ""} price={price ?? ""} />
            )})}
        </div>
    )
}