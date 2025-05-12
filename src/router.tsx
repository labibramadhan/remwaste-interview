import {
  RouterProvider,
  createRouter,
  createRoute,
  createRootRoute,
  Outlet,
  redirect,
  createHashHistory,
} from '@tanstack/react-router';
import SkipSelectionPage from './modules/order/pages/SkipSelectionPage';
import { ErrorPage } from './components/organisms';

function RootLayout() {
  return (
    <main className="bg-[#121212] text-white min-h-screen antialiased">
      <Outlet />
    </main>
  );
}

const rootRoute = createRootRoute({
  component: RootLayout,
  errorComponent: ErrorPage,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: () => {
    throw redirect({ to: '/order/select-skip' });
  },
});

const selectSkipRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/order/select-skip',
  component: SkipSelectionPage,
});

const routeTree = rootRoute.addChildren([indexRoute, selectSkipRoute]);

const routerHistory = createHashHistory();

const router = createRouter({ routeTree, history: routerHistory });

export function AppRouterProvider() {
  return <RouterProvider router={router} />;
}

export default router;
