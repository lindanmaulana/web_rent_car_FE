"use client"

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";
import { PiCarProfileDuotone } from "react-icons/pi";
import { Session } from "next-auth";
import { CardCar } from "@/app/(protected)/dashboard/components/dashboard-card/card-car";
import { CardRental } from "@/app/(protected)/dashboard/components/dashboard-card/card-rental";
import { CardInsight } from "@/app/(protected)/dashboard/components/dashboard-card/card-insight";


interface DashboardMainCarProps {
    session: Session | null
}
export const DashboardMainCard = ({session}: DashboardMainCarProps) => {

  return (
    <div className="w-full grid grid-cols-4 gap-8 absolute -bottom-20 left-0 px-4">
      <Suspense fallback={<p>Loading car...</p>}>
        <CardCar />
      </Suspense>
      <Suspense fallback={<p>Loading rental...</p>}>
        <CardRental session={session}/>
      </Suspense>
      <Suspense fallback={<p>Loading insight...</p>}>
        <CardInsight />
      </Suspense>

      <Card className="bg-white rounded-md min-h-26">
        <CardTitle className="px-4 flex items-center justify-between">
          <span className="text-xl">Car</span>
          <span className="bg-primary-blue/20 px-2 rounded py-px">
            <PiCarProfileDuotone className="text-3xl text-primary-blue" />{" "}
          </span>
        </CardTitle>
        <CardContent></CardContent>
      </Card>
    </div>
  );
};
