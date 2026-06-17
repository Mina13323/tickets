import axios from 'axios';
import { toast } from 'sonner';

const api = axios.create({
  baseURL: import.meta.env.PROD ? '/api' : 'http://localhost:5000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      toast.error('Network error. Please check your connection.');
      return Promise.reject(error);
    }

    const { status, data } = error.response;

    if (status === 401) {
      if (!error.config?.url?.endsWith('/auth/me')) {
        toast.error('Session expired. Please log in again.');
        window.location.href = '/login';
      }
    } else if (status === 403) {
      toast.error('Access denied. You do not have permission.');
    } else if (status === 404) {
      toast.error(data?.message || 'Resource not found.');
    } else if (status >= 500) {
      toast.error('Server error. Please try again later.');
    } else {
      toast.error(data?.message || 'Something went wrong.');
    }

    return Promise.reject(error);
  }
);

export default api;
