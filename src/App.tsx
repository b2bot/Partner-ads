import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import ProtectedRoute from '@/components/ProtectedRoute';
import MetricsObjectivesTab from '@/pages/MetricsObjectivesTab';
import WhatsAppReportsTab from '@/pages/WhatsAppReportsTab';
import Relatorios from '@/pages/Relatorios';

// Instância do QueryClient
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
