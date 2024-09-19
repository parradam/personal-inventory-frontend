import { useState, useEffect } from 'react';
import { useParams } from '@tanstack/react-router';

import ItemDetailView from '../components/ItemDetailView';
import { getItem, ItemListResponseData } from '../services/itemService';

const ItemDetailPage = () => {
  const { itemId } = useParams({ strict: false });

  const [item, setItem] = useState<ItemListResponseData | null>(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const retrievedItem = await getItem(Number(itemId));
        setItem(retrievedItem);
      } catch (error) {
        console.error('Error fetching item list', error);
      }
    };

    void fetchItem();
  }, [itemId]);

  console.log(item);

  return (
    <div>
      <div className="p-4">
        {item ? <ItemDetailView item={item} /> : <div>Item not found.</div>}
      </div>
    </div>
  );
};

export default ItemDetailPage;
