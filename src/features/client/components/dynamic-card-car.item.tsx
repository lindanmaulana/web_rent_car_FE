"use client"
import dynamic from "next/dynamic"
import { Suspense } from "react"

const CardItemDynamic = dynamic(() => import("@/features/client/components/card-item"), {ssr: false, loading: () => <p>Loading...</p>})

export const DynamicCardCar = () => {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <CardItemDynamic />
        </Suspense>
    )
}