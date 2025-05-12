import {
  RouterProvider,
  createRouter,
  createRoute,
  createRootRoute,
} from '@tanstack/react-router';
import SkipSelectionPage from './modules/order/pages/SkipSelectionPage';
import { Root } from './root';

const rootRoute = createRootRoute({
  component: Root,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: SkipSelectionPage,
});

const routeTree = rootRoute.addChildren([indexRoute]);

const router = createRouter({ routeTree });

export function AppRouterProvider() {
  return <RouterProvider router={router} />;
}

export default router;
