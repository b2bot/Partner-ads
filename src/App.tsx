
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import CacheDebug from './pages/CacheDebug';

// Instância do QueryClient com configurações básicas
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutos
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/cache-debug" element={<CacheDebug />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
