import { useState, useEffect } from 'react';
import { useParams } from '@tanstack/react-router';

import ItemDetailView from '../components/ItemDetailView';
import { getItem, ItemListResponseData } from '../services/itemService';
import ItemEventsDetailView from '../components/ItemEventsDetailView';
import {
  getItemEvents,
  ItemEventResponseData,
} from '../services/itemEventsService';

const ItemDetailPage = () => {
  const { itemId } = useParams({ strict: false });

  const [item, setItem] = useState<ItemListResponseData | null>(null);
  const [itemEvents, setItemEvents] = useState<ItemEventResponseData | null>(
    null,
  );

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const retrievedItem = await getItem(Number(itemId));
        setItem(retrievedItem);
      } catch (error) {
        console.error('Error fetching item', error);
      }
    };

    const fetchItemEvents = async () => {
      try {
        const retrievedItemEvents = await getItemEvents(Number(itemId));
        setItemEvents(retrievedItemEvents);
      } catch (error) {
        console.error('Error fetching item events', error);
      }
    };

    void fetchItems();
    void fetchItemEvents();
  }, [itemId]);

  return (
    <div className="p-4 flex flex-col gap-4">
      <ItemDetailView
        item={item}
        setItem={
          setItem as React.Dispatch<React.SetStateAction<ItemListResponseData>>
        }
      />
      <ItemEventsDetailView itemEvents={itemEvents} />
    </div>
  );
};

export default ItemDetailPage;
