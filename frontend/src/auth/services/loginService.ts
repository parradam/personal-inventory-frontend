import axios from 'axios';

interface LoginParams {
  username: string;
  password: string;
}

interface AuthTokenResponseData {
  token: string;
}

const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/api/auth_token`;

export const loginService = async ({
  username,
  password,
}: LoginParams): Promise<AuthTokenResponseData> => {
  const response = await axios.post<AuthTokenResponseData>(`${baseUrl}/token`, {
    username,
    password,
  });
  return response.data;
};
