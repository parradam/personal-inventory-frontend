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
        console.error('Error fetching item', error);
      }
    };

    void fetchItem();
  }, [itemId]);

  return (
    <div className="p-4">
      {/* Type assertion as item would never be null after this check */}
      <ItemDetailView
        item={item}
        setItem={
          setItem as React.Dispatch<React.SetStateAction<ItemListResponseData>>
        }
      />
    </div>
  );
};

export default ItemDetailPage;
