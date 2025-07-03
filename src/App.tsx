import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthWrapper } from "@/components/AuthWrapper";
import { ResetPasswordForm } from '@/components/ResetPasswordForm';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { FiltersProvider } from "@/hooks/dashboard_hooks/useFilters";
import { SettingsProvider } from "@/hooks/dashboard_hooks/useSettings";

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
                <FiltersProvider>
                  <SettingsProvider clientId="default">
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </SettingsProvider>
                </FiltersProvider>
              </AuthWrapper>
            } 
          />
        </Routes>
        <Toaster />
        <Sonner />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
