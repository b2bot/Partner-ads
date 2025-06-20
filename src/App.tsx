
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { AuthWrapper } from '@/components/AuthWrapper';
import { Dashboard } from '@/components/Dashboard';
import { ResetPasswordForm } from '@/components/ResetPasswordForm';
import Index from '@/pages/Index';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/reset-password" element={<ResetPasswordForm />} />
          <Route 
            path="/*" 
            element={
              <AuthWrapper>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
              </AuthWrapper>
            } 
          />
        </Routes>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
