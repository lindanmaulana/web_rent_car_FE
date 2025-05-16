import { queryResponses } from "@/utils/helpers/queryResponse";
import { UtilsCarBrand } from "@/utils/services/car-brand";
import { useQuery } from "@tanstack/react-query";
import { CarBrand } from "../../../types/car-brand";

export const useCarBrandGetAll = (): queryResponses<CarBrand> => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["carBrandGetAll"],
    queryFn: () => UtilsCarBrand.getAll(),
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
};
