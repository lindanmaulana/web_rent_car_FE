import { UtilsCarBrandGetAll } from "@/utils/car-brand"
import { useQuery } from "@tanstack/react-query"
import { CarBrand } from "../../../types/car-brand"

interface useCarBrandGetAllResponse {
    data: {
        data: CarBrand[]
    },
    isLoading: boolean
    isError: boolean
    error: {
        message: string
    }
}
export const useCarBrandGetAll = () => {
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ["carBrandGetAll"],
        queryFn: () => UtilsCarBrandGetAll()
    }) as useCarBrandGetAllResponse

    return {
        data,
        isLoading,
        isError,
        error
    }
}
