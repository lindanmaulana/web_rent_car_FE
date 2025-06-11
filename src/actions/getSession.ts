"use server"

import { auth } from "@/auth"
import { redirect } from "next/navigation"

export const getSession = async () => {
    const session = await auth()

    if(!session) redirect("/auth/login")

    return session
}