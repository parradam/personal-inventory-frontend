import axios from 'axios';

export interface CreateItemPostData {
  name: string;
  used_from: Date;
  used_to?: Date;
  barcode: string | null;
  owner: string | null;
}

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

export const getItem = async (
  itemId: number,
): Promise<ItemListResponseData> => {
  const response = await axios.get<ItemListResponseData>(
    `${baseUrl}/items/${String(itemId)}`,
    {
      withCredentials: true,
    },
  );
  return response.data;
};

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

export const createItem = async (
  values: CreateItemPostData,
): Promise<ItemListResponseData> => {
  const response = await axios.post<ItemListResponseData>(
    `${baseUrl}/items/`,
    values,
    {
      withCredentials: true,
    },
  );
  return response.data;
};

export const updateItem = async (
  values: ItemListResponseData,
): Promise<ItemListResponseData> => {
  const response = await axios.put<ItemListResponseData>(
    `${baseUrl}/items/${String(values.id)}`,
    values,
    {
      withCredentials: true,
    },
  );
  return response.data;
};
