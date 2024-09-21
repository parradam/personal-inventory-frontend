import { ItemListResponseData } from '../services/itemService';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import UpdateItemForm from './UpdateItemForm';

interface ItemDetailViewProps {
  item: ItemListResponseData | null;
  setItem: React.Dispatch<React.SetStateAction<ItemListResponseData>>;
}

const ItemDetailView: React.FC<ItemDetailViewProps> = ({ item, setItem }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{item?.name ? item.name : 'Item not found'}</CardTitle>
      </CardHeader>
      {item ? (
        <CardContent>
          <div className="max-w-screen-sm">
            <UpdateItemForm item={item} setItem={setItem} />
          </div>
        </CardContent>
      ) : (
        <CardContent>The item you requested doesn&apos;t exist.</CardContent>
      )}
    </Card>
  );
};

export default ItemDetailView;
