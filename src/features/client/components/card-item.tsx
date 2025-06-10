"use client"

import { ErrorUi } from "@/components/feedbacks/error-ui"
import { LoadingUi } from "@/components/feedbacks/loading-ui"
import { CardCar } from "@/features/client/components/card-car"
import { useCarGetAll } from "@/hooks/car"
import { APIURLIMAGE } from "@/publicConfig"
import { UtilsFormatCurrency } from "@/utils/helpers/formatCurrency"
import { useSearchParams } from "next/navigation"

const CarCarList = () => {
    const urlParams = useSearchParams()
    const carGetAll = useCarGetAll({params: urlParams.toString()})

    if(carGetAll.isLoading) return <LoadingUi />
    if(carGetAll.isError) return <ErrorUi message={carGetAll.error?.message} />
    
    return (
        <>
            {carGetAll.data?.data.map(car => {
                const price = UtilsFormatCurrency(Number(car.price_per_day))

                return (
                <CardCar key={car.id} id={car.id} model={car.model} category={car.category.name} image={car.thumbnail ? `${APIURLIMAGE}${car.thumbnail}` : "/images/car-default.png"} year={car.year ?? ""} seats={car.seats ?? ""} price={price ?? ""} />
            )})}
        </>
    )
}

export default CarCarList