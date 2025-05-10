import { axiosInstance } from "./axios-instance"
import { UtilsErrorService } from "./errors"

export const UtilsCarBrandGetAll = async () => {
    try {
        const response = await axiosInstance.get("/car-brands")

        return response.data
    } catch (err) {
        throw new Error(UtilsErrorService(err))
    }
}