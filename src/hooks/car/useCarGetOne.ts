"use client"

import { UtilsCarGetOne } from "@/utils/car"
import { useQuery } from "@tanstack/react-query"

interface useCarGetOneProps {
    id: string
}

export const useCarGetOne = ({id}: useCarGetOneProps) => {
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ["getOneCar", id],
        queryFn: () => UtilsCarGetOne({id}),
    })

    return {
        data,
        isLoading,
        isError,
        error
    }
}