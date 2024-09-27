import useAuthCheck from '@/shared/hooks/useAuthCheck';
import React from 'react';

interface AuthCheckWrapperProps {
  children: React.ReactNode;
}

const AuthCheckWrapper: React.FC<AuthCheckWrapperProps> = ({ children }) => {
  const { data } = useAuthCheck();

  if (!data) {
    return <div className="p-4">Loading...</div>;
  }

  return children;
};

export default AuthCheckWrapper;
