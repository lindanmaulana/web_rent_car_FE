"use client"

import { useSession } from "next-auth/react"
import { Suspense, useEffect } from "react"
import { toast } from "sonner"
import { DashboardMainCarHeader } from "./car-header"
import { DashboardMainCarItem } from "./car-item"
import { LoadingCar } from "./car-loading"

export const DashboardMainCar = () => {
    const session = useSession()

    useEffect(() => {
        if(session.status === "loading") toast.loading("Session loading...")

    }, [session.status])

    return (
        <div className="flex flex-col gap-4">
            <DashboardMainCarHeader />
            <Suspense fallback={<LoadingCar />}>
                <DashboardMainCarItem session={session.data}/>
            </Suspense>
        </div>
    )
}