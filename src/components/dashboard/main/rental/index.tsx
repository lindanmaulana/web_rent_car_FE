"use client"
import { Suspense, useState } from "react"
import { DashboardMainRentalHeader } from "./rental-header"
import { DashboardMainRentalItem } from "./rental-item"
import { useSession } from "next-auth/react"

interface searchParamsRental {
    
}
export const DashboardMainRental = () => {
    const session = useSession()
    const [params, setParams] = useState<searchParamsRental>({})

    return (
        <div className="flex flex-col gap-4">
            <DashboardMainRentalHeader />
            <Suspense fallback={<p>Loading please waitt</p>}>
                <DashboardMainRentalItem session={session.data} />
            </Suspense>
        </div>      
    )
}