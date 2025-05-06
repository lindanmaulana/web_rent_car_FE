import { TypeCarCreateSchema, TypeCarUpdateSchema } from "@/schemas/car"
import { axiosInstance, setToken } from "./axios-instance"
import { UtilsErrorService } from "./errors"
import { searchParamsCar } from "@/components/dashboard/main/car"



export const UtilsCarCreate = async (data: TypeCarCreateSchema, token?: string) => {
    
    if(token) {
        setToken(token)
    } else {
        throw new Error("Invalid authentication")
    }

    try {
        const response = await axiosInstance.post("/cars", data)

        return response.data
    } catch (err) {
        UtilsErrorService(err)
    }
}

interface UtilsCarGetAllParams {
    params?: searchParamsCar
}

export const UtilsCarGetAll = async ({params}: UtilsCarGetAllParams) => {
    const dataParams = [params?.seats && params.seats, params?.status && params.status, params?.year && params?.year, params?.keyword && params.keyword]
    const routeParams = dataParams.filter(param => param).join("&")

    try {
        const response = await axiosInstance.get(`/cars?${routeParams}`)

        return response.data.data
    } catch (err) {
        UtilsErrorService(err)
    }
}

interface UtilsCarGetOneParams {
    id: string
}
export const UtilsCarGetOne = async ({id}: UtilsCarGetOneParams) => {
    try {
        const response = await axiosInstance.get(`/cars/${id}`)

        return response.data.data
    } catch (err) {
        UtilsErrorService(err)        
    }
}

interface UtilsCarUpdateParams {
    data: TypeCarUpdateSchema
    id: string
    token?: string
}
export const UtilsCarUpdate = async (params: UtilsCarUpdateParams) => {
    if(params.token) {
        setToken(params.token)
    }

    try {
        const response = await axiosInstance.patch(`/cars/${params.id}`, params.data)
        console.log("Masuk try")
        return response.data
    } catch (err) {
        throw new Error(UtilsErrorService(err))
    }
}

interface UtilsCarDeleteParams {
    id: string
    token?: string
}
export const UtilsCarDelete = async ({id, token}: UtilsCarDeleteParams) => {
    if(token) {
        setToken(token)
    }
    
    try {
        const response = await axiosInstance.delete(`/cars/${id}`)

        return response.data
    } catch (err) {
        UtilsErrorService(err)
    }
}