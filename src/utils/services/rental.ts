import { TypeRentalCreateSchema, TypeRentalUpdateSchema } from "@/schemas/rental";
import { axiosInstance, setToken } from "../axios-instance";
import { UtilsErrorService } from "../helpers/errors";

export interface RentalCreateParams {
  token?: string
  data?: TypeRentalCreateSchema
}

export interface RentalGetAllParams {
  params?: string;
  token?: string;
}

export interface RentalUpdateParams {
  token?: string;
  id: string;
  data: TypeRentalUpdateSchema;
}

export interface RentalGetOneParams {
  id: string
}

export const UtilsRentalCreate = async ({token, data}: RentalCreateParams) => {
  if(token) setToken(token)

  try {
    const response = await axiosInstance.post("/rentals", data)

    return response.data
  } catch (err) {
    throw new Error(UtilsErrorService(err))
  }
}

export const UtilsRentalGetAll = async ({ token, params, }: RentalGetAllParams) => {
  if (token) setToken(token);

  try {
    const response = await axiosInstance.get(`/rentals?${params}`);

    return response.data;
  } catch (err) {
    throw new Error(UtilsErrorService(err));
  }
};


export const UtilsRentalUpdate = async ({
  id,
  token,
  data,
}: RentalUpdateParams) => {
  if (token) setToken(token);

  try {
    const response = await axiosInstance.patch(`/rentals/${id}`, data);

    return response.data;
  } catch (err) {
    throw new Error(UtilsErrorService(err));
  }
};


export const UtilsRentalGetOne = async ({id}: RentalGetOneParams) => {
  try {
    const response = await axiosInstance.get(`/rentals/${id}`)

    return response.data
  } catch (err) {
    throw new Error(UtilsErrorService(err))
  }
}