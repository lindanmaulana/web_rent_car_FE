"use client"

import { useSession } from "next-auth/react"
import { Suspense, useState } from "react"
import { toast } from "sonner"
import { DashboardMainCarHeader } from "./car-header"
import { DashboardMainCarItem } from "./car-item"
import { LoadingCar } from "./car-loading"


export const DashboardMainCar = () => {
    const [params, setParams] = useState<string>("")
    const session = useSession()

    if(session.status === "loading") toast.loading("Session loading...")
    return (
        <div className="flex flex-col gap-4">
            <DashboardMainCarHeader setParams={setParams} />
            <Suspense fallback={<LoadingCar />}>
                <DashboardMainCarItem session={session.data} params={params} />
            </Suspense>
        </div>
    )
}