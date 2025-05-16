"use client";
import { UtilsCarGetAll } from "@/utils/services/car";
import { queryResponses } from "@/utils/helpers/queryResponse";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Car } from "../../../types/car";
interface useCarGetAllProps {
  params?: string;
}

export const useCarGetAll = ({
  params,
}: useCarGetAllProps): queryResponses<Car> => {
  const { data, isError } = useSuspenseQuery({
    queryKey: ["getAllCar", params],
    queryFn: () => UtilsCarGetAll({ params }),
  });

  return {
    data,
    isError,
  };
};
