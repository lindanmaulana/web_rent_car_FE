"use client";

import { UtilsImageGetByIdCar } from "@/utils/services/image";
import { useQuery } from "@tanstack/react-query";

interface useImageGetByIdProps {
  id: string;
}
export const useImageGetById = (
  { id }: useImageGetByIdProps,
  token?: string
) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getById", id],
    queryFn: () => UtilsImageGetByIdCar({ id }, token),
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
};
