import { AxiosError } from 'axios';

export const useErrorMessage = (error: AxiosError<{ error: string }>) => {
  if (!error) return undefined;

  if (error.response?.data?.error) {
    return error.response.data.error;
  }

  return 'Something went wrong';
};