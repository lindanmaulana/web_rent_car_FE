import {
  TypeCarCategoryAddSchema,
  TypeCarCategoryUpdateSchema,
} from "@/schemas/car-category";
import { axiosInstance, setToken } from "../axios-instance";
import { UtilsErrorService } from "../helpers/errors";

export interface UtilsCarCategoryAddParams {
  data: TypeCarCategoryAddSchema;
  token?: string;
}

interface UtilsCarCategoryUpdateParams {
  token?: string;
  id: string;
  data: TypeCarCategoryUpdateSchema;
}

interface UtilsCarCategoryDeleteParams {
  token?: string;
  id: string;
}

export class UtilsCarCategory {
  static async create({ token, data }: UtilsCarCategoryAddParams) {
    if (token) setToken(token);
    try {
      const response = await axiosInstance.post("/car-categories", data);

      return response.data;
    } catch (err) {
      throw new Error(UtilsErrorService(err));
    }
  }

  static async getALl() {
    try {
      const response = await axiosInstance.get("/car-categories");

      return response.data;
    } catch (err) {
      throw new Error(UtilsErrorService(err));
    }
  }

  static async getOne(id: string) {
    try {
      const response = await axiosInstance.get(`/car-categories/${id}`);

      return response.data;
    } catch (err) {
      throw new Error(UtilsErrorService(err));
    }
  }

  static async update({ token, id, data }: UtilsCarCategoryUpdateParams) {
    if (token) setToken(token);

    try {
      const response = await axiosInstance.patch(`/car-categories/${id}`, data);

      return response.data;
    } catch (err) {
      throw new Error(UtilsErrorService(err));
    }
  }

  static async delete({ id, token }: UtilsCarCategoryDeleteParams) {
    if (token) setToken(token);

    try {
      const response = await axiosInstance.delete(`/car-categories/${id}`);

      return response.data;
    } catch (err) {
      throw new Error(UtilsErrorService(err));
    }
  }
}
