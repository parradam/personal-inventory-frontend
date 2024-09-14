import ItemListView from '../components/ItemListView';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ItemListPage = () => {
  return (
    <div className="min-h-screen">
      <div className="p-4">
        <Card>
          <CardHeader>
            <CardTitle>Your inventory</CardTitle>
          </CardHeader>
          <CardContent>
            <ItemListView />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ItemListPage;
