import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ItemEventsDetailTable from './ItemEventsDetailTable';
import { ItemEventResponseData } from '../services/itemEventsService';

interface ItemEventsDetailViewProps {
  itemEvents: ItemEventResponseData | null;
}

const ItemEventsDetailView: React.FC<ItemEventsDetailViewProps> = ({
  itemEvents,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>History</CardTitle>
      </CardHeader>
      {itemEvents ? (
        <CardContent>
          <div className="max-w-screen-sm">
            <ItemEventsDetailTable itemEvents={itemEvents} />
          </div>
        </CardContent>
      ) : (
        <CardContent>There are no events for this item.</CardContent>
      )}
    </Card>
  );
};

export default ItemEventsDetailView;
