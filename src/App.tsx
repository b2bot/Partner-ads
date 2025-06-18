import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import ProtectedRoute from '@/components/ProtectedRoute';
import MetricsObjectivesTab from '@/pages/MetricsObjectivesTab';
import WhatsAppReportsTab from '@/pages/WhatsAppReportsTab';
import Relatorios from '@/pages/Relatorios';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/relatorios" element={<Relatorios />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
