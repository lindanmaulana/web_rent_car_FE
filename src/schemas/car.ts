import { z, ZodType } from "zod";

export const CarCreateSchema: ZodType = z.object({
    brand: z.string().min(1, "Brand is required").optional(),
    model: z.string().min(1, "Model is required"),
    year: z.coerce.number().positive().refine(val => !isNaN(val), {
        message: "Year is required"
    }),
    license_plate: z.string().min(4, "License plate is required"),
    seats: z.coerce.number().positive().refine(val => !isNaN(val), {
        message: "Seats is required"
    }),
    price_per_day: z.string().min(1, "Price per day is required")
})
export type TypeCarCreateSchema = z.infer<typeof CarCreateSchema>

export const CarUpdateSchema: ZodType = z.object({
    brand: z.string().optional(),
    model: z.string().optional(),
    year: z.coerce.number().positive().optional(),
    license_plate: z.string().min(4, "License plate is required").optional(),
    seats: z.coerce.number().positive().optional(),
    price_per_day: z.string().optional(),
    thumbnail: z.string().optional(),
    status: z.enum(["AVAILABLE", "UNAVAILABLE", "MAINTENANCE"]).optional()
})
export type TypeCarUpdateSchema = z.infer<typeof CarUpdateSchema>