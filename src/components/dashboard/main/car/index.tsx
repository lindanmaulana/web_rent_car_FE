"use client"

import { useSession } from "next-auth/react"
import { Suspense, useState } from "react"
import { DashboardMainCarHeader } from "./car-header"
import { DashboardMainCarItem } from "./car-item"
import { LoadingCar } from "./car-loading"

export interface searchParamsCar {
    status: string
    year: string
    seats: string
    keyword: string
}
export const DashboardMainCar = () => {
    const session = useSession()
    const [params, setParams] = useState<searchParamsCar>({
        status: '',
        year: '',
        seats: '',
        keyword: ''
    })
    
    console.log({session})
    return (
        <div className="flex flex-col gap-4">
            <DashboardMainCarHeader params={params} setParams={setParams} />
            <Suspense fallback={<LoadingCar />}>
                <DashboardMainCarItem session={session.data} params={params} />
            </Suspense>
        </div>
    )
}