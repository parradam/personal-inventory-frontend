import { ItemListResponseData } from '../services/itemService';

import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface ItemDetailViewProps {
  item: ItemListResponseData;
}

const ItemDetailView: React.FC<ItemDetailViewProps> = ({ item }) => {
  const usedFromDate = new Date(item.used_from).toLocaleDateString();
  const usedToDate = item.used_to
    ? new Date(item.used_to).toLocaleDateString()
    : 'present';
  return (
    <Card>
      <CardHeader>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {item.name}
        </h1>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Item details
        </h2>
        <p>Barcode: {item.barcode ? item.barcode : 'none'}</p>
        <p>Owner: {item.owner}</p>
        <p>
          Used: {usedFromDate} - {usedToDate}
        </p>
      </CardContent>
    </Card>
  );
};

export default ItemDetailView;
