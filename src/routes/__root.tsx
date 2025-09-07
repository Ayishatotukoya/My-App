import { ReactQueryProvider } from '@/features/query';
import { Outlet, createRootRoute } from '@tanstack/react-router'



export const Route = createRootRoute({
  component: () => (
    <>
      <ReactQueryProvider>
        <Outlet />
      </ReactQueryProvider>
    </>
  ),
});
