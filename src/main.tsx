
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from '@/components/ui/sonner';
import App from './App.tsx';
import './index.css';
import { initAutoFix } from './utils/autoFixCache';

// Inicializar sistema de auto-correção de cache
initAutoFix({
  autoReload: false, // Não fazer reload automático
  showNotifications: true, // Mostrar notificações
  debugMode: true // Modo debug ativo
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <Toaster />
  </StrictMode>,
);
