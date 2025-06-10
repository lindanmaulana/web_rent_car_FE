"use client"

import { LoadingUi } from "@/components/feedbacks/loading-ui";
import { useSession } from "next-auth/react";
import { Suspense } from "react";
import { DashboardMainCard } from "./dashboard-main-card";
import { DashboardMainChart } from "./dashboard-main-chart";

export const DashboardMain = () => {
    const session = useSession()

    if(session.status === "unauthenticated") return <LoadingUi />
  return (
    <>
      <div className="w-full bg-primary-blue min-h-[180px] rounded px-5 relative">
        <h2 className="text-3xl text-white tracking-widest py-10">Rent LinmId</h2>
        <Suspense fallback={<p>Loading...</p>}>
          <DashboardMainCard session={session.data} />
        </Suspense>
      </div>
      <div className="py-20 grid grid-cols-2">
        <Suspense fallback={<p>Loading..</p>}>
          <DashboardMainChart session={session.data} />
        </Suspense>
      </div>
    </>
  );
};
