import { useEffect, useState } from 'react';
import { getItemList, ItemListResponseData } from '../services/itemService';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const ItemListView: React.FC = () => {
  const [itemList, setItemList] = useState<ItemListResponseData[]>([]);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const retrievedItemList = await getItemList();
        setItemList(retrievedItemList);
      } catch (error) {
        console.log('Error fetching item list', error);
      }
    };

    void fetchItem();
  }, []);

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
              <TableCell className={item.used_to ? 'text-destructive' : ''}>
                {item.used_to && 'Removed'}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default ItemListView;
