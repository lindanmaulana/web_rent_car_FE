"use client"
import { useSession } from "next-auth/react"
import { Suspense } from "react"
import { DashboardMainRentalHeader } from "./rental-header"
import { DashboardMainRentalItem } from "./rental-item"
import { LoadingUi } from "@/components/feedbacks/loading-ui"

export interface searchParamsRental {
    car_id: string
    start_date: string
    end_date: string
    status: string
}
export const DashboardMainRental = () => {
    const session = useSession()

    if(session.status === "loading") return <LoadingUi />

    return (
        <div className="flex flex-col gap-4">
            <DashboardMainRentalHeader />
            <Suspense fallback={<p>Loading please waitt</p>}>
                <DashboardMainRentalItem session={session.data} />
            </Suspense>
        </div>      
    )
}