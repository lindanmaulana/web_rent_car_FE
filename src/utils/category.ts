import { axiosInstance } from "./axios-instance"
import { UtilsErrorService } from "./errors"

export const UtilsCategoryGetAll = async () => {
    try {
        const response = await axiosInstance.get("/car-categories")

        return response.data
    } catch (err) {
        throw new Error(UtilsErrorService(err))
    }
}