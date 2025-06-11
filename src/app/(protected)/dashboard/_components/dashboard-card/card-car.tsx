"use client";
import { ErrorUi } from "@/components/feedbacks/error-ui";
import { Card, CardContent } from "@/components/ui/card";
import { useCarGetAll } from "@/hooks/car";
import { useRouter, useSearchParams } from "next/navigation";
import { IoIosCar } from "react-icons/io";
import { CardSkeleton } from "../card-skeleton";

export const CardCar = () => {
    const urlParams = useSearchParams()
    const queryCarGetAll = useCarGetAll({params: urlParams.toString()})
    const router = useRouter()

    if(queryCarGetAll.isLoading) return <CardSkeleton />
    if(queryCarGetAll.isError) return <ErrorUi message={queryCarGetAll.error?.message} />

  return (
    <Card onClick={() => router.push(`/dashboard/inventory/car?${urlParams.toString()}`)} className="bg-white rounded-md min-h-26 cursor-pointer">
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
            <h4 className="text-xl font-medium">Car</h4>
            <span className="bg-primary-blue/20 px-2 rounded py-px">
            <IoIosCar size={25} className="text-primary-blue" />{" "}
            </span>
        </div>
        <div className="space-y-1">
            <p className="text-3xl font-semibold">{queryCarGetAll.data.pagination?.totalItems}</p>
        </div>
      </CardContent>
    </Card>
  );
};