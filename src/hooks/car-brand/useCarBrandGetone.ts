import { UtilsCarBrand } from "@/utils/services/car-brand";
import { queryResponse } from "@/utils/helpers/queryResponse";
import { useQuery } from "@tanstack/react-query";
import { CarBrand } from "../../../types/car-brand";

export const useCarBrandGetOne = (id: string): queryResponse<CarBrand> => {
  const carBrandGetOne = useQuery({
    queryKey: ["carBrandGetOne"],
    queryFn: () => UtilsCarBrand.getOne(id),
  });

  return {
    data: carBrandGetOne.data,
    isLoading: carBrandGetOne.isLoading,
    isError: carBrandGetOne.isError,
    error: carBrandGetOne.error,
  };
};
