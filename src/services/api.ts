import axios from 'axios';
import { QueryClient } from 'react-query';

export const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export const queryClient = new QueryClient()