import { typeLoginSchema, typeRegisterSchema } from "@/schemas/auth"
import { axiosInstance } from "./axios-instance"
import { UtilsErrorService } from "./errors"

export const UtilsAuthLogin = async (data: typeLoginSchema) => {
    try {
        const response = await axiosInstance.post("/auth/login", data)
        console.log({RESPONSE: response.data})

        return response.data.data
    } catch (err) {
        return UtilsErrorService(err)
    }
}

export const UtilsAuthRegister = async (data: typeRegisterSchema) => {
    try {
        const response = await axiosInstance.post("/auth/register", data)

        return response.data.data
    } catch (err) {
        return UtilsErrorService(err)
    }
}