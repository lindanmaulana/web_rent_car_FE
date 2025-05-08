"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useCarGetAll } from "@/hooks/car";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosCar } from "react-icons/io";

export const CardCar = () => {
    const [carAvailable, setCarAvailable] = useState<number>()
    const {data} = useCarGetAll({params: {keyword: ''}})
    const router = useRouter()

    useEffect(() => {
        const carMapping = data.filter(car => car.status === "AVAILABLE")
        setCarAvailable(carMapping.length)
    }, [data])

  return (
    <Card onClick={() => router.push("/dashboard/car-rental")} className="bg-white rounded-md min-h-26 cursor-pointer">
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
            <h4 className="text-xl font-medium">Car</h4>
            <span className="bg-primary-blue/20 px-2 rounded py-px">
            <IoIosCar size={25} className="text-primary-blue" />{" "}
            </span>
        </div>
        <div className="space-y-1">
            <p className="text-3xl font-semibold">{data.length}</p>
            <p className="text-primary/60">{carAvailable} Available</p>
        </div>
      </CardContent>
    </Card>
  );
};
