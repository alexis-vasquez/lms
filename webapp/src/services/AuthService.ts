import { useMutation } from '@tanstack/react-query';
import { client } from './axiosClient';

type LoginResponse = {
  token: string;
};

class AuthService {
  static login = async (email: string, password: string) =>
    client.post<LoginResponse>('/auth/login', { email, password });
}

export const useLoginMutation = () => {
  return useMutation(
    ({ email, password }: { email: string; password: string }) =>
      AuthService.login(email, password)
  );
};
