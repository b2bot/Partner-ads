import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// 1. Cria o client
const queryClient = new QueryClient();

// 2. Renderiza a App dentro do Provider
createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
