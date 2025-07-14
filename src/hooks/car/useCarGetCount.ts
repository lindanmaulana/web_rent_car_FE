"use client"

import { queryResponse } from "@/utils/helpers/queryResponse"
import { CarCount } from "../../../types/car"
import { useQuery } from "@tanstack/react-query"
import { UtilsCarGetCount } from "@/utils/services/car"

export const useCarGetCount = (): queryResponse<CarCount> => {
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['getCountCar'],
        queryFn: () => UtilsCarGetCount()
    })

    return {
        data,
        isLoading,
        isError,
        error
    }
}