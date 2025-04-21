"use client"

import { Session } from "next-auth"
import { Car } from "../../../../../types/car"
import { DashboardMainCarHeader } from "./car-header"
import { DashboardMainCarItem } from "./car-item"

interface DashboardMainCarProps {
    setParams: (params: string) => void
    dataCar: Car[]
    session: Session | null
}
export const DashboardMainCar = ({setParams, dataCar, session}: DashboardMainCarProps) => {

    return (
        <div className="flex flex-col gap-4">
            <DashboardMainCarHeader setParams={setParams} />
            <DashboardMainCarItem data={dataCar} session={session} />
        </div>
    )
}