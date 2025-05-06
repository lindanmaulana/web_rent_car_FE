"use client"
import { useSession } from "next-auth/react"
import { Suspense, useState } from "react"
import { DashboardMainRentalHeader } from "./rental-header"
import { DashboardMainRentalItem } from "./rental-item"

export interface searchParamsRental {
    car_id: string
    start_date: string
    end_date: string
    status: string
}
export const DashboardMainRental = () => {
    const session = useSession()
    const [params, setParams] = useState<searchParamsRental>({
        car_id: "",
        start_date: "",
        end_date: "",
        status: ''
    })

    return (
        <div className="flex flex-col gap-4">
            <DashboardMainRentalHeader params={params} setParams={setParams} />
            <Suspense fallback={<p>Loading please waitt</p>}>
                <DashboardMainRentalItem session={session.data} />
            </Suspense>
        </div>      
    )
}