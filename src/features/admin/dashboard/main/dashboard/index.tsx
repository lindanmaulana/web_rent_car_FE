"use client"

import { useSession } from "next-auth/react";
import { Suspense } from "react";
import { DashboardMainCard } from "./card";
import { DashboardMainChart } from "./chart";

export const DashboardMain = () => {
    const session = useSession()

    return (
        <div className="space-y-8">
            <div className="w-full bg-primary-blue min-h-[180px] rounded px-5 relative">
                <h2 className="text-3xl text-white tracking-widest py-10">Rent LinmId</h2>
                <Suspense fallback={<p>Loading...</p>}>
                    <DashboardMainCard session={session.data} />
                </Suspense>
            </div>
            <div className="py-20 grid grid-cols-2">
                <DashboardMainChart />
            </div>
        </div>
    )
}