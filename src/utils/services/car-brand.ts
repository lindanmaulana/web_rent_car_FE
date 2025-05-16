import { TypeCarBrandSchemaCreate, TypeCarBrandSchemaUpdate } from "@/schemas/car-brand"
import { axiosInstance, setToken } from "../axios-instance"
import { UtilsErrorService } from "../helpers/errors"


interface createParams {
    token?: string
    data: TypeCarBrandSchemaCreate
}

interface updateParams {
    token?: string
    id: string
    data: TypeCarBrandSchemaUpdate
}

interface deleteParams {
    token?: string
    id: string
}

export class UtilsCarBrand {
    static async create({token, data}: createParams) {
        if(token) setToken(token)

        try {
            const response = await axiosInstance.post("/car-brands", data)

            return response.data
        } catch (err) {
            throw new Error(UtilsErrorService(err))
        }
    }

    static async getAll() {
        try {
            const response = await axiosInstance.get("/car-brands")

            return response.data
        } catch (err) {
            throw new Error(UtilsErrorService(err))
        }
    }

    static async getOne(id: string) {
        try {
            const response = await axiosInstance.get(`/car-brands/${id}`)

            return response.data
        } catch (err) {
            throw new Error(UtilsErrorService(err))
        }
    }

    static async update({token, id, data}: updateParams) {
        if(token) setToken(token)
            
        try {
            const response = await axiosInstance.patch(`/car-brands/${id}`, data)

            return response.data
        } catch (err) {
            throw new Error(UtilsErrorService(err))
        }
    }

    static async delete({token, id}: deleteParams) {
        if(token) setToken(token)

        try {
            const response = await axiosInstance.delete(`/car-brands/${id}`)

            return response.data
        } catch (err) {
            throw new Error(UtilsErrorService(err))
        }
    }
}