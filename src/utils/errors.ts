import { AxiosError } from "axios"
import { AuthError } from "next-auth"

export const UtilsErrorAuthentication = (err: unknown) => {
    if(err instanceof AuthError) {
        switch(err.type) {
            case "CredentialsSignin":
                throw new Error("Invalid credentials!")
            default:
                throw new Error ("An unexpected error occurred!")
        }
    }

    throw new Error("Error tidak diketahui")
}

export const UtilsErrorService = (err: unknown) => {
    let errorMessage = "An unexpected error occurred!"

    if(err instanceof AxiosError) {
        errorMessage = err.response?.data.errors
    } else if(err instanceof Error) {
        errorMessage = err.message
    } else if(err instanceof AuthError) {
        errorMessage = err.message
    }

    throw new Error(errorMessage)
} 

export const UtilsErrorConsumeAPI = (err: unknown) => {
    let errorMessage = "An unexpected error occurred!"

    if(err instanceof AxiosError) {
        errorMessage = err.response?.data.errors
    } else if(err instanceof Error) {
        errorMessage = err.message
    } 

    return errorMessage
}