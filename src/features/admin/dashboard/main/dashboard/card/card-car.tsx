"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useCarGetAll } from "@/hooks/car";
import { useRouter, useSearchParams } from "next/navigation";
import { IoIosCar } from "react-icons/io";

export const CardCar = () => {
    const urlParams = useSearchParams()

    const {data} = useCarGetAll({params: urlParams.toString()})
    const router = useRouter()


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
            <p className="text-3xl font-semibold">{data.pagination?.totalItems}</p>
        </div>
      </CardContent>
    </Card>
  );
};
