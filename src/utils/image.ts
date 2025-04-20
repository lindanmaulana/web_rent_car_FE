import { axiosInstance, setContentType, setToken } from "./axios-instance"
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

interface UtilsImageCreateParams {
    id: string
    token?: string
    file: File 
}
export const UtilsImageCreate = async ({id, token, file}: UtilsImageCreateParams) => {
    if(token) {
        setToken(token)
    }

    const formData = new FormData()
    formData.append("image", file)
    setContentType(formData)

    try {
        const response = await axiosInstance.post(`/images/${id}`, formData)

        return response.data
    } catch (err) {
        UtilsErrorService(err)
    }
}