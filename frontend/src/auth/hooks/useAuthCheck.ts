import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import axios, { AxiosError } from 'axios';

interface AuthCheckApiParams {
  authenticated: boolean;
}

const useAuthCheck = () => {
  const [isAuthCheckSuccessful, setIsAuthCheckSuccessful] = useState<
    boolean | null
  >(null);
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
        const response = await apiClient.get<AuthCheckApiParams>(
          '/auth_token/check',
          {
            withCredentials: true,
          },
        );
        if (response.data.authenticated) {
          setIsAuthCheckSuccessful(true);
        }
      } catch (error) {
        console.error('Failed to fetch data', error);
        setIsAuthCheckSuccessful(false);
      }
    };

    void fetchData();

    return () => {
      apiClient.interceptors.response.eject(interceptor);
    };
  }, [navigate]);

  return { isAuthCheckSuccessful };
};

export default useAuthCheck;
