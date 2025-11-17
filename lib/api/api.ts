import axios from 'axios';
import { attachAuthInterceptor } from './axiosAuthInterceptor';

export const nextServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + '/api',
  withCredentials: true,
});

attachAuthInterceptor(nextServer);
