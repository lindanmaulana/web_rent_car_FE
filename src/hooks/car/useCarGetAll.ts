"use client"
import { UtilsCarGetAll } from "@/utils/car"
import { useSuspenseQuery } from "@tanstack/react-query"
import { Car } from "../../../types/car"

interface useCarGetAllProps {
    params?: string
}
export const useCarGetAll = ({params}: useCarGetAllProps) => {
    const {data, isError} = useSuspenseQuery({
        queryKey: ["getAllCar", params],
        queryFn: () => UtilsCarGetAll({params})
    }) as {data: Car[], isError: boolean}

    return {
        data,
        isError
    }
}