import { z, ZodType } from "zod";
export class RentalSchema {
    static readonly CREATE: ZodType = z.object({
        car_id: z.string().min(1, "Car ID is required"),
        start_date: z.string(),
        end_date: z.string(),
        total_price: z.string(),
    })

    static readonly UPDATE: ZodType = z.object({
        car_id: z.string().optional(),
        start_date: z.date().optional(),
        end_date: z.date().optional(),
        status: z.enum(["APPROVE", "COMPLETED", "PENDING", "REJECTED"]).optional(),
        total_day: z.number().optional()
    })
}

export type TypeRentalUpdateSchema = z.infer<typeof RentalSchema.UPDATE>

// car_id?: string
// start_date?: Date
// end_date?: Date
// status?: RentalStatus
// total_day?: number
// total_price?: Decimal