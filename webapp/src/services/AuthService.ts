import { client } from './axiosClient';

type TokenResponse = {
  token: string;
};

export class AuthService {
  static validateToken = async () => {
    const response = await client.get<TokenResponse>('/auth');
    return response.data;
  };

  static login = async (values: { email: string; password: string }) => {
    const response = await client.post<TokenResponse>('/auth/login', values);
    return response.data;
  };
}
