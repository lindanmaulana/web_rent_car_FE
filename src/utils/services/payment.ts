import { TypePaymentCreateSchema } from "@/schemas/payments"
import { axiosInstance, setToken } from "../axios-instance"
import { UtilsErrorService } from "../helpers/errors"

interface defaultParams {
    token?: string
    id?: string
}

export class UtilsPayment {
    static async create({token}: defaultParams, data: TypePaymentCreateSchema) {
        if(token) setToken(token)

            console.log({token, data})

        try {
            const response = await axiosInstance.post("/payments", data)

            return response.data
        } catch (err) {
            throw new Error(UtilsErrorService(err))
        }
    }
}