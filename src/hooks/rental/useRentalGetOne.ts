import { RentalGetOneParams, UtilsRentalGetOne } from "@/utils/services/rental"
import { useQuery } from "@tanstack/react-query"


export const useRentalGetOne = (params: RentalGetOneParams) => {
    const queryRental = useQuery({
        queryKey: ["rentalGetOne"],
        queryFn: () => UtilsRentalGetOne(params)
    })

    return queryRental
}