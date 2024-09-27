import axios from 'axios';

const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/api/auth_token`;

export const logoutService = async (): Promise<void> => {
  await axios.post(`${baseUrl}/logout`, {}, { withCredentials: true });
};
