import axios from 'axios';

export const useAxiosClient = () => {
  const token = localStorage.getItem('token');

  const client = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { authorization: token }),
    },
  });
  
  return { client };
}