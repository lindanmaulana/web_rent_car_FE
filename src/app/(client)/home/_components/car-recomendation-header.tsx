"use client"

import { Button } from "@/components/ui/button"
import { LucideChevronsRight } from "lucide-react"
import Link from "next/link"

export const CarHeader = () => {
    return (
        <div className="w-full flex items-center justify-between">
            <h2 className="text-gray-bluish text-[16px] font-semibold text-left">Pilihan Mobil Terbaik</h2>
            <Button className="bg-primary-blue" size={"sm"}  asChild>
                    <Link href={`/car?page=1&limit=5`} className="flex items-center justify-end text-xs">Lihat Lebih banyak <LucideChevronsRight className="self-center" /></Link>
            </Button>
        </div>
    )
}