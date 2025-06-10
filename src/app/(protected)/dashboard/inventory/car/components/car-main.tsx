"use client"

import { LoadingUi } from "@/components/feedbacks/loading-ui"
import { useSession } from "next-auth/react"
import { Suspense } from "react"
import { LoadingCar } from "./car-loading"
import { CarMainItem } from "./car-main-item"

export const CarMain = () => {
    const session = useSession()

    if(session.status !== "authenticated") return <LoadingUi />

    return (
        <Suspense fallback={<LoadingCar />}>
            <CarMainItem session={session.data}/>
        </Suspense>
    )
}