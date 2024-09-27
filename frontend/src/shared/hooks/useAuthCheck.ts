import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import axios, { AxiosError } from 'axios';

interface AuthCheckParams {
  authenticate: boolean;
}

const useAuthCheck = () => {
  const [data, setData] = useState<AuthCheckParams | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Create an Axios instance for API requests
    const apiClient = axios.create({
      baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
    });

    // Set up an Axios interceptor to handle 401 errors
    const interceptor = apiClient.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        if (error.response?.status === 401) {
          await navigate({ to: '/login' });
        }
        return Promise.reject(error);
      },
    );

    // Fetch the authentication status from the server
    const fetchData = async () => {
      try {
        const response = await apiClient.get<AuthCheckParams>(
          '/auth_token/check',
          {
            withCredentials: true,
          },
        );
        setData(response.data);
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };

    void fetchData();

    return () => {
      apiClient.interceptors.response.eject(interceptor);
    };
  }, [navigate]);

  return { data };
};

export default useAuthCheck;
