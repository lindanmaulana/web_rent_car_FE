"use client"

import { APIURLIMAGE } from "@/publicConfig"
import { UtilsFormatCurrency } from "@/utils/helpers/formatCurrency"
import { Car } from "../../../../../types/car"
import { CardCar } from "../../home/_components/card-car"

interface CarListProps {
    cars: Car[]
}
export const CarList = ({cars}: CarListProps) => {
    return (
        <ul className="grid grid-cols-5 gap-5">
            {cars.map(car => {
                const price = UtilsFormatCurrency(Number(car.price_per_day))

                return (
                <CardCar key={car.id} brand={car.brand.name} id={car.id} model={car.model} category={car.category.name} image={car.thumbnail ? `${APIURLIMAGE}${car.thumbnail}` : "/images/car-default.png"} year={car.year ?? ""} seats={car.seats ?? ""} price={price ?? ""} />
            )})}
        </ul>
    )
}