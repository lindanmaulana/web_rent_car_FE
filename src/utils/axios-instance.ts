import { APIURL } from "@/publicConfig";
import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: APIURL,
})

export const setContentType = (data: unknown) => {
    if(data instanceof FormData) {
        delete axiosInstance.defaults.headers["Content-Type"]
    } else {
        axiosInstance.defaults.headers["Content-Type"] = "application/json"
    }
}

export const setToken = (token: string | null) => {
    if(token) {
        axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`
    } else {
        delete axiosInstance.defaults.headers["Authorization"]
    }
}