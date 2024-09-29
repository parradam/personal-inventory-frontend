import NotAuthWrapperRedirect from '@/auth/components/NotAuthWrapperRedirect';
import LoginPage from '@/auth/pages/LoginPage';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/login')({
  component: () => (
    <NotAuthWrapperRedirect to="/items">
      <LoginPage />,
    </NotAuthWrapperRedirect>
  ),
});
