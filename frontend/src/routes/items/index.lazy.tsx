import AuthCheckWrapper from '@/auth/components/AuthCheckWrapper';
import ItemListPage from '@/item_management/pages/ItemListPage';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/items/')({
  component: () => (
    <AuthCheckWrapper>
      <ItemListPage />
    </AuthCheckWrapper>
  ),
});
