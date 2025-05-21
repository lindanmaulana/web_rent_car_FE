"use client"
import dynamic from "next/dynamic"
import { Suspense } from "react"

const CardItemDynamic = dynamic(() => import("@/features/client/home/car-rekomendation/card-item"), {ssr: false, loading: () => <p>Loading...</p>})

export const HomeCarRecomendationCardItemDynamic = () => {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <CardItemDynamic />
        </Suspense>
    )
}