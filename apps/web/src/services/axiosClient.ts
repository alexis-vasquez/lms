import { CONFIG } from '@/config';
import axios from 'axios';

export const useAxiosClient = () => {
  const token = localStorage.getItem('token');

  const client = axios.create({
    baseURL: CONFIG.API_URL,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { authorization: token }),
    },
  });
  
  return { client };
}