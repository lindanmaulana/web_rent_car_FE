"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useRentalGetAll } from "@/hooks/rental";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUserClock } from "react-icons/fa";
import { Rental } from "../../../../../../../types/rental";

interface CardRentalProps {
  session: Session | null;
}
export const CardRental = ({ session }: CardRentalProps) => {
  const [rentalPending, setRentalPending] = useState<number>();
  const { data } = useRentalGetAll({ token: session?.user.token });
  const router = useRouter();

  useEffect(() => {
    const rentalMapping = data.data.filter((rental: Rental) => {
      return rental.status === "PENDING";
    });

    setRentalPending(rentalMapping.length);
  }, [data]);
  return (
    <Card
      onClick={() => router.push("/dashboard/rental")}
      className="bg-white rounded-md min-h-26 cursor-pointer"
    >
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xl font-medium">Rental</h4>
          <span className="bg-primary-blue/20 px-2 rounded py-px">
            <FaUserClock size={25} className=" text-primary-blue" />
          </span>
        </div>
        <div className="space-y-1">
          <p className="text-3xl font-semibold">{data.total}</p>
          <p className="text-primary/60">{rentalPending} Rental Pending</p>
        </div>
      </CardContent>
    </Card>
  );
};
