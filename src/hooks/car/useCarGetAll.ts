"use client"
import { UtilsCarGetAll } from "@/utils/car"
import { useQuery } from "@tanstack/react-query"

interface useCarGetAllProps {
    params?: string
}
export const useCarGetAll = ({params}: useCarGetAllProps) => {
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ["getAllCar", params],
        queryFn: () => UtilsCarGetAll({params})
    })

    return {
        data,
        isLoading,
        isError,
        error
    }
}