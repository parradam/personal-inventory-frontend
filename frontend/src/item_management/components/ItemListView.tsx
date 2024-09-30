import { Link } from '@tanstack/react-router';

import { ItemListResponseData } from '../services/itemService';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface ItemListViewProps {
  itemList: ItemListResponseData[];
  searchFilter: string;
  removeItemFromList: (itemId: number) => Promise<void>;
}

const ItemListView: React.FC<ItemListViewProps> = ({
  itemList,
  searchFilter,
  removeItemFromList,
}) => {
  const copyOfItemList = itemList.map((item) => item);
  const filteredItemList = copyOfItemList.filter((item) => {
    const foundInName = item.name
      .toLowerCase()
      .includes(searchFilter.toLowerCase());
    const foundInBarcode = item.barcode
      ?.toLowerCase()
      .includes(searchFilter.toLowerCase());
    const foundInOwner = item.owner
      ?.toLowerCase()
      .includes(searchFilter.toLowerCase());
    if (foundInName || foundInBarcode || foundInOwner) {
      return item;
    }
  });

  const sortedItemList = filteredItemList.sort((a, b) => {
    if (b.used_from > a.used_from) {
      return 1;
    } else {
      return -1;
    }
  });

  return (
    <Table>
      <TableCaption className="text-xs">
        {sortedItemList.length === 0 ? 'No' : sortedItemList.length} items.
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
              <TableCell className="max-w-[1/5]">
                <Link to={String(item.id)} className="cursor-pointer">
                  <Button
                    variant="link"
                    className="whitespace-normal break-all max-w-full h-fit"
                  >
                    {item.name}
                  </Button>
                </Link>
              </TableCell>
              <TableCell className="max-w-[1/5] text-pretty">
                {item.barcode}
              </TableCell>
              <TableCell className="max-w-[1/5] text-pretty">
                {item.owner}
              </TableCell>
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
