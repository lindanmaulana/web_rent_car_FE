import { z, ZodType } from "zod";
export class RentalSchema {
    static readonly CREATE: ZodType = z.object({
        car_id: z.string().min(1),
        start_date: z.date(),
        end_date: z.date(),
        total_day: z.string()
    })

    static readonly UPDATE: ZodType = z.object({
        car_id: z.string().optional(),
        start_date: z.date().optional(),
        end_date: z.date().optional(),
        status: z.enum(["APPROVE", "COMPLETED", "PENDING", "REJECTED"]).optional(),
        total_day: z.number().optional()
    })
}

export type TypeRentalCreateSchema = z.infer<typeof RentalSchema.CREATE>
export type TypeRentalUpdateSchema = z.infer<typeof RentalSchema.UPDATE>

    // car_id: string
    // start_date: Date
    // end_date: Date
    // total_day: number
    // total_price: Decimal
    // status: RentalStatus