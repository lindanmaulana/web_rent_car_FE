import { axiosInstance, setToken } from "./axios-instance"
import { UtilsErrorService } from "./errors"

interface UtilsImageGetByIdCarParams {
    id: string
}
export const UtilsImageGetByIdCar = async ({id}: UtilsImageGetByIdCarParams, token?: string) => {
    if(token) {
        setToken(token)
    }
    try {
        const response = await axiosInstance.get(`/images/${id}`)

        return response.data
    } catch (err) {
        UtilsErrorService(err)
    }
}