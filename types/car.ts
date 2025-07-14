import { Images } from "./image"

export interface Car {
    id: string
    category: {
        id: string
        name: string
        description: string
    }
    brand: {
        id: string
        name: string
        country: string
    }
    model: string
    year: number
    license_plate: string
    seats: number
    price_per_day: string
    thumbnail?: string
    status: string
    image?: Images[]
    createdAt: Date
    updatedAt: Date
}

export interface CarCount {
    total: number
}

export const CARSEATS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
export const CARYEAR = ["2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025"];
export const CARSTATUS = ["available", "unavailable", "maintenance"]