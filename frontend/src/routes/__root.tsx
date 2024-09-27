import LogoutButton from '@/auth/components/LogoutButton';
import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
  component: () => (
    <div className="flex flex-col min-h-screen">
      <div className="p-4 flex justify-between items-center">
        <div className="flex gap-4">
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>
          <Link to="/register" className="[&.active]:font-bold">
            Register
          </Link>
          <Link to="/login" className="[&.active]:font-bold">
            Login
          </Link>
          <Link to="/items" className="[&.active]:font-bold">
            Items
          </Link>
        </div>
        <LogoutButton />
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
});
