import React from 'react';
import { useAuth } from '../hooks/useAuth';

interface NotAuthWrapperProps {
  children: React.ReactNode;
}

const NotAuthWrapper: React.FC<NotAuthWrapperProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return children;

  return null;
};

export default NotAuthWrapper;
