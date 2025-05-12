import { createRoot } from 'react-dom/client';
import { AppRouterProvider } from './router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';

const container = document.querySelector('#root') as Element;
const root = createRoot(container);

const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <AppRouterProvider />
  </QueryClientProvider>,
);
