import React from 'react';
import useAuthCheck from '@/shared/hooks/useAuthCheck';

interface AuthCheckWrapperProps {
  children: React.ReactNode;
}

const AuthCheckWrapper: React.FC<AuthCheckWrapperProps> = ({ children }) => {
  const { data } = useAuthCheck();

  if (!data) return null;

  return children;
};

export default AuthCheckWrapper;
