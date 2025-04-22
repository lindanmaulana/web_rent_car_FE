import { z, ZodType } from "zod";

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

export const OauthSchema: ZodType = z.object({
    id: z.string().optional(),
    name: z.string().optional(),
    email: z.string(),
    provider: z.string().optional(),
    providerAccountId: z.string().optional(),
    image: z.string().optional()
})

export type typeOauthSchema = z.infer<typeof OauthSchema>


// export type UserOauthRequest = {
//     id?: string
//     name?: string
//     email: string
//     provider?: string
//     providerAccountId?: string
//     image?: string
//   }