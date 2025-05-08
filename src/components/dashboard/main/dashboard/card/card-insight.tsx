"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { BsBarChartFill } from "react-icons/bs"

export const CardInsight = () => {
    const router = useRouter()

    return (
    <Card onClick={() => router.push("/dashboard/insight")} className="bg-white rounded-md min-h-26 cursor-pointer">
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
            <h4 className="text-xl font-medium">Insight</h4>
            <span className="bg-primary-blue/20 px-2 rounded py-px">
            <BsBarChartFill size={25} className=" text-primary-blue" />{" "}
            </span>
        </div>
        <div className="space-y-1">
            <p className="text-3xl font-semibold">2</p>
            <p className="text-primary/60">2 Available</p>
        </div>
      </CardContent>
    </Card>
    )
}