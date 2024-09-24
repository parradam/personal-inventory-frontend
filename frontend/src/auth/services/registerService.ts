import axios from 'axios';

export interface RegisterParams {
  username: string;
  email: string;
  password: string;
}

interface RegisterResponseData {
  username: string;
}

const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/api/auth_token`;

export const registerService = async ({
  username,
  email,
  password,
}: RegisterParams): Promise<RegisterResponseData> => {
  const response = await axios.post<RegisterResponseData>(
    `${baseUrl}/register`,
    {
      username,
      email,
      password,
    },
    { withCredentials: true },
  );
  return response.data;
};
