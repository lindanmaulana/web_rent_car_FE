"use client"

import { Button } from "@/components/ui/button"
import { LucideChevronsRight } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export const CarHeader = () => {
    const urlParams = useSearchParams()

    return (
        <div className="w-full flex items-center justify-between">
            <h2 className="text-gray-bluish text-[16px] font-semibold text-left">Pilihan Mobil Terbaik</h2>
            <Button className="bg-primary-blue" size={"sm"}  asChild>
                    <Link href={`/car?${urlParams.toString()}`} className="flex items-center justify-end text-xs">Lihat Lebih banyak <LucideChevronsRight className="self-center" /></Link>
            </Button>
        </div>
    )
}