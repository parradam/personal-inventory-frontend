import AuthCheckWrapper from '@/auth/components/AuthCheckWrapper';
import ItemDetailPage from '@/item_management/pages/ItemDetailPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/items/$itemId')({
  component: () => (
    <AuthCheckWrapper>
      <ItemDetailPage />
    </AuthCheckWrapper>
  ),
});
