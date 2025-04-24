"use client"
import { Session } from "next-auth"
import { DashboardMainRentalHeader } from "./rental-header"
import { DashboardMainRentalItem } from "./rental-item"
import { Rental } from "../../../../../types/rental"

interface DashboardMainRentalProps {
    setParams: (params: string) => void
    session: Session | null
    dataRental: Rental[]
}
export const DashboardMainRental = ({dataRental, session, setParams}: DashboardMainRentalProps) => {
    
    return (
        <div className="flex flex-col gap-4">
            <DashboardMainRentalHeader />
            <DashboardMainRentalItem data={dataRental} session={session} />
        </div>      
    )
}