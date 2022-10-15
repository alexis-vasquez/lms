import axios from 'axios';

const token = localStorage.getItem('token');

export const client = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
    ...(token && { authorization: token }),
  },
});
