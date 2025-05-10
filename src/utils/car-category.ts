import { axiosInstance, setToken } from "./axios-instance"
import { UtilsErrorService } from "./errors"

export const UtilsCarCategoryGetAll = async () => {
    try {
        const response = await axiosInstance.get("/car-categories")

        return response.data
    } catch (err) {
        throw new Error(UtilsErrorService(err))
    }
}

interface CarCategoryDeleteParams {
    token?: string
    id: string
}
export const UtilsCarCategoryDelete = async ({id, token}: CarCategoryDeleteParams) => {
    if(token) {
        setToken(token)
    }

    try {
        const response = await axiosInstance.delete(`/car-categories/${id}`)

        return response.data
    } catch (err) {
        throw new Error(UtilsErrorService(err))
    }
}