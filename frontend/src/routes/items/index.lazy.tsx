import ItemListPage from '@/item_management/pages/ItemListPage';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/items/')({
  component: () => <ItemListPage />,
});
