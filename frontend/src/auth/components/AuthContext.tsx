import { createContext, useEffect, useState } from 'react';
import useAuthCheck from '../hooks/useAuthCheck';

export const AuthContext = createContext({
  isAuthenticated: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  setIsAuthenticated: (_value: boolean) => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const { isAuthCheckSuccessful } = useAuthCheck();

  useEffect(() => {
    if (isAuthCheckSuccessful) setIsAuthenticated(true);
  }, [isAuthCheckSuccessful]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
