import { z, ZodType } from "zod";

export class RentalSchema {
    static readonly CREATE: ZodType = z.object({
        car_id: z.string().min(1, "Car ID is required"),
        start_date: z.string(),
        end_date: z.string(),
        total_price: z.string(),
    })
}