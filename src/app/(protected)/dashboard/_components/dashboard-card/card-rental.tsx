"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useRentalGetAll } from "@/hooks/rental";
import { useRouter } from "next/navigation";
import { FaUserClock } from "react-icons/fa";
import { CardSkeleton } from "../card-skeleton";
import { ErrorUi } from "@/components/feedbacks/error-ui";

interface CardRentalProps {
  token: string;
}

export const CardRental = ({ token }: CardRentalProps) => {
  const queryRentalGetAll = useRentalGetAll({ token });
  const router = useRouter();

  if(queryRentalGetAll.isLoading) return <CardSkeleton />
  if(queryRentalGetAll.isError) return <ErrorUi message={queryRentalGetAll.error?.message} />

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
          <p className="text-3xl font-semibold">{queryRentalGetAll.data.total}</p>
        </div>
      </CardContent>
    </Card>
  );
};
