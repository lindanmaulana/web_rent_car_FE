import { RentalGetAllParams, UtilsRentalGetAll } from "@/utils/rental"
import { useSuspenseQuery } from "@tanstack/react-query"

export const useRentalGetAll = ({token}: RentalGetAllParams) => {
    const {data, isError, error} = useSuspenseQuery({
        queryKey: ['rentalGetAll'],
        queryFn: () => UtilsRentalGetAll({token})
    })

    return {
        data,
        isError,
        error
    }
}