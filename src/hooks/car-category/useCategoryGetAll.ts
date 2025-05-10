import { useQuery, useSuspenseQuery } from "@tanstack/react-query"
import { CarCategory } from "../../../types/car-category"
import { UtilsCarCategoryGetAll } from "@/utils/car-category"

interface useCategoryGetAllResponse {
    data: {
        data: CarCategory[]
    },
    isLoading: boolean
    isError: boolean
    error: {
        message: string
    }
}

export const useCategoryGetAll = () => {
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['CarCategoryGetAll'],
        queryFn: () => UtilsCarCategoryGetAll()
    }) as useCategoryGetAllResponse

    return {
        data,
        isLoading,
        isError,
        error
    }
}

export const useCategoryGetAllSuspense = () => {
    const {data, isError, error} = useSuspenseQuery({
        queryKey: ['carCategoryGetAllSuspense'],
        queryFn: () => UtilsCarCategoryGetAll()
    }) as useCategoryGetAllResponse

    return {
        data,
        isError,
        error
    }
}