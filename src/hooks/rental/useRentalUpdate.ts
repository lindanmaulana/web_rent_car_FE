import { RentalUpdateParams, UtilsRentalUpdate } from "@/utils/rental"
import { useMutation } from "@tanstack/react-query"

export const useRentalUpdate = () => {
    const {mutate} = useMutation({
        mutationKey: ['rentalUpdate'],
        mutationFn: (params: RentalUpdateParams) => UtilsRentalUpdate(params)
    })

    return mutate
}