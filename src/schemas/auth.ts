import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().email("Email is required"),
    password: z.string().min(1, "Password is required")
})
export type typeLoginSchema = z.infer<typeof LoginSchema>


export const RegisterSchema = z.object({
    name: z.string().min(1, "Name is required").max(100),
    email: z.string().email("Email is required"),
    password: z.string().min(6, "Password min 6 character")
})
export type typeRegisterSchema = z.infer<typeof RegisterSchema>