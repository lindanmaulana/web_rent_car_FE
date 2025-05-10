import { UtilsCategoryGetAll } from "@/utils/category"
import { useQuery } from "@tanstack/react-query"
import { Category } from "../../../types/category"

interface useCategoryGetAllResponse {
    data: {
        data: Category[]
    },
    isLoading: boolean
    isError: boolean
    error: {
        message: string
    }
}

export const useCategoryGetAll = () => {
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['categoryGetAll'],
        queryFn: () => UtilsCategoryGetAll()
    }) as useCategoryGetAllResponse

    return {
        data,
        isLoading,
        isError,
        error
    }
}