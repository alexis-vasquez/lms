import { LoginFormValues } from "@/components/forms/LoginForm";
import { RegisterFormValues } from "@/components/forms/RegisterForm";
import { useAxiosClient } from "./axiosClient";

type TokenResponse = {
  token: string;
};

export const useAuthService = () => {
  const { client } = useAxiosClient();
  return class AuthService {
    static validateToken = async () => {
      const response = await client.get<TokenResponse>("/auth");
      return response.data;
    };

    static login = async (values: Omit<LoginFormValues, "remember">) => {
      const response = await client.post<TokenResponse>("/auth/login", values);
      return response.data;
    };

    static register = async (values: Omit<RegisterFormValues, "remember">) => {
      const response = await client.post<TokenResponse>(
        "/auth/register",
        values
      );
      return response.data;
    };
  };
};
