import { RentalGetAllParams, UtilsRentalGetAll } from "@/utils/services/rental";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useRentalGetAll = ({ token, params }: RentalGetAllParams) => {
  const { data, isError, error } = useSuspenseQuery({
    queryKey: ["rentalGetAll", params],
    queryFn: () => UtilsRentalGetAll({ token, params }),
  });

  return {
    data,
    isError,
    error,
  };
};

export const useRentalGetAllFilter = ({
  token,
  params,
}: RentalGetAllParams) => {
  const { data, isError, error } = useSuspenseQuery({
    queryKey: ["rentalGetAllFilter", params],
    queryFn: () => UtilsRentalGetAll({ token, params }),
  });

  return {
    data,
    isError,
    error,
  };
};
