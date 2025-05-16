import { z, ZodType } from "zod";

export class CarBrandSchema {
    static readonly UPDATE: ZodType = z.object({
        name: z.string().min(1).optional(),
        country: z.string().min(1).optional()
    })

    static readonly CREATE: ZodType = z.object({
        name: z.string().min(1).max(100),
        country: z.string().min(1).max(100)
    })
}

export type TypeCarBrandSchemaUpdate = z.infer<typeof CarBrandSchema.UPDATE>
export type TypeCarBrandSchemaCreate = z.infer<typeof CarBrandSchema.CREATE>