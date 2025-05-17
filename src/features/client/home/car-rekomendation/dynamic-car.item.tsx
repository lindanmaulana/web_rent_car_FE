"use client"
import dynamic from "next/dynamic"

const CardItemDynamic = dynamic(() => import("@/features/client/home/car-rekomendation/card-item"), {ssr: false, loading: () => <p>Loading...</p>})

export const HomeCarRecomendationCardItemDynamic = () => {
    return (
        <CardItemDynamic />
    )
}