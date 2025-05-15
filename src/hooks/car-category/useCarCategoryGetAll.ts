import { UtilsCarCategoryGetAll, UtilsCarCategoryGetAllFilter } from "@/utils/car-category"
import { useQuery, useSuspenseQuery } from "@tanstack/react-query"
import { CarCategory } from "../../../types/car-category"

interface useCarCategoryGetAllResponse {
    data: {
        data: CarCategory[]
    },
    isLoading: boolean
    isError: boolean
    error: {
        message: string
    }
}

export const useCarCategoryGetAll = () => {
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['CarCategoryGetAll'],
        queryFn: () => UtilsCarCategoryGetAll()
    }) as useCarCategoryGetAllResponse

    return {
        data,
        isLoading,
        isError,
        error
    }
}

export const useCarCategoryGetAllSuspense = () => {
    const {data, isError, error} = useSuspenseQuery({
        queryKey: ['carCategoryGetAllSuspense'],
        queryFn: () => UtilsCarCategoryGetAllFilter()
    }) as useCarCategoryGetAllResponse

    return {
        data,
        isError,
        error
    }
}