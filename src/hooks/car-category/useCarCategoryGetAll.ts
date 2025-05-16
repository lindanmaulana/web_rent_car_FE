import { UtilsCarCategory } from "@/utils/services/car-category";
import { useQuery } from "@tanstack/react-query";
import { CarCategory } from "../../../types/car-category";

interface useCarCategoryGetAllResponse {
  data: {
    data: CarCategory[];
  };
  isLoading: boolean;
  isError: boolean;
  error: {
    message: string;
  };
}

export const useCarCategoryGetAll = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["CarCategoryGetAll"],
    queryFn: () => UtilsCarCategory.getALl(),
  }) as useCarCategoryGetAllResponse;

  return {
    data,
    isLoading,
    isError,
    error,
  };
};
