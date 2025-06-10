import { z, ZodType } from "zod";

export class PaymentSchema {
    static readonly CREATE: ZodType = z.object({
        rental_id: z.string(),
        amount: z.string(),
        gateway: z.enum(["MIDTRANS", "XENDIT", 'STRIPE'])
    })
}

export type TypePaymentCreateSchema = z.infer<typeof PaymentSchema.CREATE>