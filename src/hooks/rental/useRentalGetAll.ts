import { UtilsRentalGetAll } from "@/utils/rental"
import { useQuery } from "@tanstack/react-query"

export const useRentalGetAll = () => {
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['rentalGetAll'],
        queryFn: () => UtilsRentalGetAll()
    })

    return {
        data,
        isLoading,
        isError,
        error
    }
}