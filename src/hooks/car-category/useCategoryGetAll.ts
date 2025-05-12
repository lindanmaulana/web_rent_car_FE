import { UtilsCarCategoryGetAll, UtilsCarCategoryGetAllFilter, UtilsCarCategoryGetAllFilterParams } from "@/utils/car-category"
import { useQuery, useSuspenseQuery } from "@tanstack/react-query"
import { CarCategory } from "../../../types/car-category"

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

export const useCategoryGetAllSuspense = (params: UtilsCarCategoryGetAllFilterParams) => {
    const {data, isError, error} = useSuspenseQuery({
        queryKey: ['carCategoryGetAllSuspense', params.params],
        queryFn: () => UtilsCarCategoryGetAllFilter(params)
    }) as useCategoryGetAllResponse

    return {
        data,
        isError,
        error
    }
}