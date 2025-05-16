import { UtilsCarCategory } from "@/utils/services/car-category";
import { useQuery } from "@tanstack/react-query";

export const useCarCategoryGetOne = (id: string) => {
  const carCategoryGetOne = useQuery({
    queryKey: ["carCategoryGetOne"],
    queryFn: () => UtilsCarCategory.getOne(id),
  });

  return carCategoryGetOne;
};
