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
import { ItemListResponseData } from '../services/itemService';

interface ItemListViewProps {
  itemList: ItemListResponseData[];
  removeItemFromList: (itemId: number) => Promise<void>;
}

const ItemListView: React.FC<ItemListViewProps> = ({
  itemList,
  removeItemFromList,
}) => {
  const sortedItemList = itemList.sort((a, b) => {
    if (b.used_from > a.used_from) {
      return 1;
    } else {
      return -1;
    }
  });

  return (
    <Table>
      <TableCaption className="text-xs">
        {itemList.length === 0 ? 'No' : itemList.length} items.
      </TableCaption>
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
        {sortedItemList.map((item) => {
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
