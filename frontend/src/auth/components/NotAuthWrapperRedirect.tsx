import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';

import { useAuth } from '../hooks/useAuth';

interface NotAuthWrapperRedirectProps {
  children: React.ReactNode;
  to: string;
}

const NotAuthWrapperRedirect: React.FC<NotAuthWrapperRedirectProps> = ({
  children,
  to,
}) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const redirect = () => {
      void navigate({ to });
    };

    if (isAuthenticated) {
      redirect();
    }
  }, [isAuthenticated, navigate, to]);

  return children;
};

export default NotAuthWrapperRedirect;
