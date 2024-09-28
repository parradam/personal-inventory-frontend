import AuthWrapper from '@/auth/components/AuthWrapper';
import ItemDetailPage from '@/item_management/pages/ItemDetailPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/items/$itemId')({
  component: () => (
    <AuthWrapper>
      <ItemDetailPage />
    </AuthWrapper>
  ),
});
