import React from 'react';
import { useAuth } from '../hooks/useAuth';

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return null;

  return children;
};

export default AuthWrapper;
