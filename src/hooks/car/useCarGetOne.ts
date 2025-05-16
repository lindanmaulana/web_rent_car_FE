"use client";

import { UtilsCarGetOne } from "@/utils/services/car";
import { useQuery } from "@tanstack/react-query";
import { Car } from "../../../types/car";
import { queryResponse } from "@/utils/helpers/queryResponse";

interface useCarGetOneProps {
  id: string;
}

export const useCarGetOne = ({ id }: useCarGetOneProps): queryResponse<Car> => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getOneCar", id],
    queryFn: () => UtilsCarGetOne({ id }),
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
};
