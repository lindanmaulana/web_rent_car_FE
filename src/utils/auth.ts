import { typeLoginSchema, typeOauthSchema, typeRegisterSchema } from "@/schemas/auth"
import { axiosInstance } from "./axios-instance"
import { UtilsErrorAuthentication, UtilsErrorService } from "./errors"

export const UtilsAuthLogin = async (data: typeLoginSchema) => {
    try {
        const response = await axiosInstance.post("/auth/login", data)
        
        return response.data.data
    } catch (err) {
        return {
            errors: UtilsErrorAuthentication(err)
        }
    }
}

export const UtilsAuthRegister = async (data: typeRegisterSchema) => {
    try {
        const response = await axiosInstance.post("/auth/register", data)

        return response.data.data
    } catch (err) {
        throw new Error(UtilsErrorService(err))
    }
}

export const UtilsAuthOauth = async (data: typeOauthSchema) => {
    try {
        const response = await axiosInstance.post("/auth/oauth", data)

        return response.data.data
    } catch (err) {
        
        return {
            errors: UtilsErrorService(err)
        }
    }
}