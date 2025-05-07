"use client"

import { useSession } from "next-auth/react"

export const DashboardMain = () => {
    const session = useSession()
    console.log({session})
    return (
        <div>
            
        </div>
    )
}