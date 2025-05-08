"use client";
import { UtilsCarGetAll } from "@/utils/car";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Car } from "../../../types/car";
import { searchParamsCar } from "@/features/admin/dashboard/main/car";

interface useCarGetAllProps {
  params?: searchParamsCar;
}

interface userCarGetAllResponse {
  data: Car[];
  isError: boolean;
}

export const useCarGetAll = ({
  params,
}: useCarGetAllProps): userCarGetAllResponse => {
  const { data, isError } = useSuspenseQuery({
    queryKey: ["getAllCar", params],
    queryFn: () => UtilsCarGetAll({ params }),
  }) as userCarGetAllResponse;

  return {
    data,
    isError,
  };
};
