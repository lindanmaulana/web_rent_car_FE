import {
  typeLoginSchema,
  typeOauthSchema,
  typeRefreshTokenSchema,
  typeRegisterSchema,
} from "@/schemas/auth";
import { axiosInstance } from "../axios-instance";
import { UtilsErrorAuthentication } from "../helpers/errors";

export class UtilsAuth {
  static async Login(data: typeLoginSchema) {
    try {
      const response = await axiosInstance.post("/auth/login", data, {
        withCredentials: true,
      });

      return response.data.data;
    } catch (err) {
      return {
        errors: UtilsErrorAuthentication(err),
      };
    }
  }

  static async Register(data: typeRegisterSchema) {
    try {
      const response = await axiosInstance.post("/auth/register", data);

      return response.data;
    } catch (err) {
      throw new Error(UtilsErrorAuthentication(err));
    }
  }

  static async Oauth(data: typeOauthSchema) {
    try {
      const response = await axiosInstance.post("/auth/oauth", data);

      return response.data.data;
    } catch (err) {
      return {
        errors: UtilsErrorAuthentication(err),
      };
    }
  }

  static async RefreshToken(data: typeRefreshTokenSchema) {
    try {
      const response = await axiosInstance.post("/auth/refresh-token", data);

      return response.data.data;
    } catch (err) {
      return {
        errors: UtilsErrorAuthentication(err),
      };
    }
  }
}
