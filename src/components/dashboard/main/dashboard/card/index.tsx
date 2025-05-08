"use client"

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { PiCarProfileDuotone } from "react-icons/pi";
import { Session } from "next-auth";
import { CardInsight } from "./card-insight";
import { CardCar } from "./card-car";
import { CardRental } from "./card-rental";


interface DashboardMainCarProps {
    session: Session | null
}
export const DashboardMainCard = ({session}: DashboardMainCarProps) => {
  return (
    <div className="w-full grid grid-cols-4 gap-8 absolute -bottom-20 left-0 px-4">
      <CardCar />
      <CardRental session={session}/>
      <CardInsight />
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
