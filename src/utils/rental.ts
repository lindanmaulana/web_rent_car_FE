import { axiosInstance } from "./axios-instance"
import { UtilsErrorService } from "./errors"

export const UtilsRentalGetAll = async () => {
    try {
        const response = await axiosInstance.get("/rentals")

        return response.data
    } catch (err) {
        UtilsErrorService(err)
    }
}