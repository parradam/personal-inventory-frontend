import { useNavigate } from '@tanstack/react-router';

import { useAuth } from '../hooks/useAuth';
import { logoutService } from '../services/logoutService';

import { Button } from '@/components/ui/button';

const LogoutButton = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  const logout = async () => {
    await logoutService();
    setIsAuthenticated(false);
    void navigate({ to: '/login' });
  };

  return <Button onClick={() => void logout()}>Log out</Button>;
};

export default LogoutButton;
