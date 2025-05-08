"use client"

import { useCarGetAll } from "@/hooks/car"
import { Heart } from "lucide-react"

export const HomeCarRecomendation = () => {
       const {data: dataCar} = useCarGetAll({params: {keyword: ''}})
   
    return (
        <section className="w-full">
            <h2 className="text-gray-bluish text-[16px] font-semibold text-left">Recomendation Car</h2>
            <div className="bg-white grid grid-cols-4">
                <article>
                    <div className="flex items-center justify-between">
                        <h3>Koenig Seg</h3>
                        <Heart />
                    </div>
                </article>
            </div>
        </section>
    )
}