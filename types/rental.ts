import { User } from "./user"

export type RentalStatus = "PENDING" | "APPROVE" | "REJECTED" | "COMPLETED"

export interface Rental {
    id: string
    user_id: string
    car_id: string
    start_date: Date
    end_date: Date
    total_price: string
    status: RentalStatus 
    user?: User
}
