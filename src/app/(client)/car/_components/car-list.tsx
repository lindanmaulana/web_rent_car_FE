"use client"

import { ErrorUi } from "@/components/feedbacks/error-ui"
import { useCarGetAll } from "@/hooks/car"
import { APIURLIMAGE } from "@/publicConfig"
import { UtilsFormatCurrency } from "@/utils/helpers/formatCurrency"
import { useSearchParams } from "next/navigation"
import { CarListSkeleton } from "../../home/_components/car-list-skeleton"
import { CardCar } from "../../home/_components/card-car"

export const CarList = () => {
    const urlParams = useSearchParams()
    const carGetAll = useCarGetAll({params: urlParams.toString()})

    if(carGetAll.isLoading) return <CarListSkeleton />
    if(carGetAll.isError) return <ErrorUi message={carGetAll.error?.message} />
    
    return (
        <ul className="grid grid-cols-3 gap-5">
            {carGetAll.data?.data.map(car => {
                const price = UtilsFormatCurrency(Number(car.price_per_day))

                return (
                <CardCar key={car.id} id={car.id} model={car.model} category={car.category.name} image={car.thumbnail ? `${APIURLIMAGE}${car.thumbnail}` : "/images/car-default.png"} year={car.year ?? ""} seats={car.seats ?? ""} price={price ?? ""} />
            )})}
        </ul>
    )
}