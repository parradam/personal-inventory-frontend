import axios from 'axios';

export interface ItemListResponseData {
  user_id: number;
  name: string;
  used_from: string;
  used_to: string | null;
  barcode: string | null;
  owner: string | null;
  id: number;
}

const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/api/item_management`;

export const getItemList = async (): Promise<ItemListResponseData[]> => {
  const response = await axios.get<ItemListResponseData[]>(`${baseUrl}/items`, {
    withCredentials: true,
  });
  return response.data;
};

export const removeItem = async (itemId: number): Promise<void> => {
  await axios.delete(`${baseUrl}/items/${String(itemId)}`, {
    withCredentials: true,
  });
};
