import { z, ZodType } from "zod";

export class CarCategorySchema {
    static readonly CREATE: ZodType = z.object({
        name: z.string().min(1, "Name is required"),
        description: z.string().min(1, "Description is required")
    })
}
export type TypeCarCategoryAddSchema = z.infer<typeof CarCategorySchema.CREATE>