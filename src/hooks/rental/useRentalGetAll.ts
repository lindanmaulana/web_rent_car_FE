import { UtilsRentalGetAll } from "@/utils/rental"
import { useSuspenseQuery } from "@tanstack/react-query"

export const useRentalGetAll = () => {
    const {data, isError} = useSuspenseQuery({
        queryKey: ['rentalGetAll'],
        queryFn: () => UtilsRentalGetAll()
    })

    return {
        data,
        isError,
    }
}