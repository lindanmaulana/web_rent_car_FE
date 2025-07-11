import { TypeRentalUpdateSchema } from "@/schemas/rental"
import { axiosInstance, setToken } from "./axios-instance"
import { UtilsErrorService } from "./errors"

export interface RentalGetAllParams {
    token?: string
}
export const UtilsRentalGetAll = async ({token}: RentalGetAllParams) => {
    if(token) {
        setToken(token)
    }

    try {
        const response = await axiosInstance.get("/rentals")

        return response.data
    } catch (err) {
        throw new Error(UtilsErrorService(err))
    }
}

export interface RentalUpdateParams {
    token?: string
    id: string
    data: TypeRentalUpdateSchema
}
export const UtilsRentalUpdate = async ({id, token, data}: RentalUpdateParams) => {
    if(token) {
        setToken(token)
    }

    try {
        const response = await axiosInstance.patch(`/rentals/${id}`, data)

        return response.data
    } catch (err) {
        throw new Error(UtilsErrorService(err))
    }
}