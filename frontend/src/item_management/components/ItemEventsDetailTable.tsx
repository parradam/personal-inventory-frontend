import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ItemEventResponseData } from '../services/itemEventsService';

interface ItemEventsDetailTableProps {
  itemEvents: ItemEventResponseData;
}

const ItemEventsDetailTable: React.FC<ItemEventsDetailTableProps> = ({
  itemEvents,
}) => {
  const sortedItemEvents = [...itemEvents.events].sort((a, b) => {
    if (b.event_at > a.event_at) {
      return 1;
    } else {
      return -1;
    }
  });

  return (
    <Table>
      <TableCaption className="text-xs">
        {sortedItemEvents.length === 0 ? 'No' : sortedItemEvents.length} item
        events.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedItemEvents.map((itemEvent) => {
          const eventDate = new Date(itemEvent.event_at);
          return (
            <TableRow key={itemEvent.id}>
              <TableCell className="text-pretty">
                {eventDate.toLocaleDateString()}
              </TableCell>
              <TableCell className="text-pretty">
                {itemEvent.description}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default ItemEventsDetailTable;
