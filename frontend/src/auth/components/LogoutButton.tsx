import { useNavigate } from '@tanstack/react-router';

import { logoutService } from '../services/logoutService';

import { Button } from '@/components/ui/button';

const LogoutButton = () => {
  const navigate = useNavigate();

  const logout = async () => {
    await logoutService();
    void navigate({ to: '/login' });
  };

  return <Button onClick={() => void logout()}>Log out</Button>;
};

export default LogoutButton;
