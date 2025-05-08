export type typePaymentStatus =  "PENDING" | "SUCCESS" | "FAILED" | "CANCELLED" | "EXPIRED" | "REFUNDED" 
export const PaymentStatus: typePaymentStatus[] = ["PENDING", "SUCCESS", "FAILED", "CANCELLED", "EXPIRED", "REFUNDED"]

export interface Payment {
    id: string
    rental_id: string
    amount: number
    currency: string | null
    status: typePaymentStatus
    method: string | null
    gateway: string | null
    transaction_id: string | null
    paid_at: Date | null
    createdAt: Date
    updatedAt: Date
}