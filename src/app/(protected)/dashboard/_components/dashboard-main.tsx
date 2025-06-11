"use client"

import { Suspense } from "react";
import { DashboardMainCard } from "@/app/(protected)/dashboard/_components/dashboard-main-card";
import { DashboardMainChart } from "@/app/(protected)/dashboard/_components/dashboard-main-chart";

interface DashboardMainProps {
  token: string
}
export const DashboardMain = ({token}: DashboardMainProps) => {
  return (
    <>
      <div className="w-full bg-primary-blue min-h-[180px] rounded px-5 relative">
        <h2 className="text-3xl text-white tracking-widest py-10">Rent LinmId</h2>
        <Suspense fallback={<p>Loading...</p>}>
          <DashboardMainCard token={token} />
        </Suspense>
      </div>
      <div className="py-20 grid grid-cols-2">
        <Suspense fallback={<p>Loading..</p>}>
          <DashboardMainChart session={token} />
        </Suspense>
      </div>
    </>
  );
};
