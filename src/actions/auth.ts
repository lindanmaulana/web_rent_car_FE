"use server"

import { signIn } from "@/auth";
import { LoginSchema, typeLoginSchema } from "@/schemas/auth";
import { UtilsErrorAuthentication } from "@/utils/errors";

export const loginCredentials = async (values: typeLoginSchema) => {
    const validatedFields = LoginSchema.safeParse(values)

    if(!validatedFields.success) return {error: "Invalid fields!"}

    const {email, password} = validatedFields.data

    try {
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        })
        
        return result
    } catch (err) {
        UtilsErrorAuthentication(err)
    }
}  