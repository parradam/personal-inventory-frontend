import axios from 'axios';

export interface ItemEventResponseData {
  events: {
    id: number;
    description: string;
    event_at: string;
  }[];
}

const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/api/item_management`;

export const getItemEvents = async (
  itemId: number,
): Promise<ItemEventResponseData> => {
  const response = await axios.get<ItemEventResponseData>(
    `${baseUrl}/item_events/${String(itemId)}`,
    {
      withCredentials: true,
    },
  );
  return response.data;
};
