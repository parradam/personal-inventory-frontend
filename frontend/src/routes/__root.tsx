import AuthWrapper from '@/auth/components/AuthWrapper';
import { AuthProvider } from '@/auth/components/AuthContext';
import LogoutButton from '@/auth/components/LogoutButton';
import NotAuthWrapper from '@/auth/components/NotAuthWrapper';
import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
// import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import React from 'react';

export const Route = createRootRoute({
  component: () => (
    <>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <div className="p-4 flex justify-between items-center">
            <div className="flex gap-4">
              <NotAuthWrapper>
                <Link to="/register" className="[&.active]:font-bold">
                  Register
                </Link>
                <Link to="/login" className="[&.active]:font-bold">
                  Login
                </Link>
              </NotAuthWrapper>
              <AuthWrapper>
                <Link to="/items" className="[&.active]:font-bold">
                  Items
                </Link>
              </AuthWrapper>
            </div>
            <AuthWrapper>
              <LogoutButton />
            </AuthWrapper>
          </div>
          <hr />
          <Outlet />
        </div>
      </AuthProvider>
      {import.meta.env.DEV && (
        <React.Suspense>
          <TanStackRouterDevtools />
        </React.Suspense>
      )}
    </>
  ),
});

const TanStackRouterDevtools = React.lazy(() =>
  import('@tanstack/router-devtools').then((res) => ({
    default: res.TanStackRouterDevtools,
  })),
);
