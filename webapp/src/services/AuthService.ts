import { client } from './axiosClient';

type LoginResponse = {
  token: string;
};

type UserResponse = {
  user: string;
};

export class AuthService {
  static getUser = async () => {
    const response = await client.get<UserResponse>('/auth/user');
    return response.data;
  };

  static login = async (values: { email: string; password: string }) => {
    const response = await client.post<LoginResponse>('/auth/login', values);
    return response.data;
  };
}
