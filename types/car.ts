export interface Car {
    id: string
    brand: string
    model: string
    year: number
    license_plate: string
    seats: number
    price_per_day: string
    thumbnail?: string
    status: string
    createdAt: Date
    updatedAt: Date
}