import { useEffect, useState } from 'react';
import {
  getItemList,
  removeItem,
  ItemListResponseData,
} from '../services/itemService';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Trash2 } from 'lucide-react';

const ItemListView: React.FC = () => {
  const [itemList, setItemList] = useState<ItemListResponseData[]>([]);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const retrievedItemList = await getItemList();
        setItemList(retrievedItemList);
      } catch (error) {
        console.error('Error fetching item list', error);
      }
    };

    void fetchItem();
  }, []);

  const removeItemFromList = async (itemId: number) => {
    try {
      // Remove item from server
      await removeItem(itemId);
      // Reflect change in local state
      const updatedItemList: ItemListResponseData[] = itemList.reduce<
        ItemListResponseData[]
      >((listOfItems, item) => {
        if (item.id === itemId) {
          return listOfItems;
        } else {
          return [...listOfItems, item];
        }
      }, []);
      setItemList(updatedItemList);
    } catch (error) {
      console.error('Error removing item from list', error);
    }
  };

  return (
    <Table>
      <TableCaption className="text-xs">Your inventory items.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Barcode</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead>Used from</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {itemList.map((item) => {
          const usedFromDate = new Date(item.used_from);
          return (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.barcode}</TableCell>
              <TableCell>{item.owner}</TableCell>
              <TableCell>{usedFromDate.toLocaleDateString()}</TableCell>
              <TableCell>{item.used_to && 'Obsolete'}</TableCell>
              <TableCell>
                <span
                  onClick={() => {
                    void removeItemFromList(item.id);
                  }}
                >
                  <Trash2 size={16} className="cursor-pointer" />
                </span>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default ItemListView;
