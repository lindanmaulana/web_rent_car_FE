import { AxiosError } from "axios"
import { AuthError } from "next-auth"

export const UtilsErrorAuthentication = (err: unknown): string => {
    let errorMessage: string = "Authentication failed. Please try again."

    if(err instanceof AxiosError) {
        errorMessage = err.response?.data?.message || err.response?.data?.errors || "Network or API error occurred";

    } else if(err instanceof AuthError) {
        switch(err.type) {
            case "CredentialsSignin":
            errorMessage = "Invalid credentials."
            break;
            default:
                errorMessage = "Authentication failed. Please try again."
        }

    } else if(err instanceof Error) {
        console.log({ERRORINSTANCE: err})
        errorMessage = err.message
    } 

    return errorMessage
}

export const UtilsErrorService = (err: unknown) => {
    let errorMessage = "An unexpected error occurred!"

    if(err instanceof AxiosError) {
        errorMessage = err.response?.data.errors
    } else if(err instanceof Error) {
        errorMessage = err.message
    }

    return errorMessage
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