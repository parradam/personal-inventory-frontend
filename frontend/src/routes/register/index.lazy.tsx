import RegisterPage from '@/auth/pages/RegisterPage';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/register/')({
  component: () => <RegisterPage />,
});
