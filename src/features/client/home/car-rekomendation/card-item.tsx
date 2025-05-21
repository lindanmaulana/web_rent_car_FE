"use client"

import { ErrorUi } from "@/components/feedbacks/error-ui"
import { LoadingUi } from "@/components/feedbacks/loading-ui"
import { useCarGetAll } from "@/hooks/car"
import { CardCar } from "../../components/card-car"
import { APIURLIMAGE } from "@/publicConfig"
import { UtilsFormatCurrency } from "@/utils/helpers/formatCurrency"
import { useSearchParams } from "next/navigation"

const HomeCarRecomendationCardItem = () => {
    const urlParams = useSearchParams()
    const carGetAll = useCarGetAll({params: urlParams.toString()})

    if(carGetAll.isLoading) return <LoadingUi />
    if(carGetAll.isError) return <ErrorUi message={carGetAll.error?.message} />
    
    console.log({carGetAll})
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

export default HomeCarRecomendationCardItem