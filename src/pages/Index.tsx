
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { Dashboard } from '@/components/Dashboard';
import { CampaignsTab } from '@/components/CampaignsTab';
import { AdSetsTab } from '@/components/AdSetsTab';
import { AdsTab } from '@/components/AdsTab';
import { RelatoriosTab } from '@/components/RelatoriosTab';
import { WhatsAppReportsTab } from '@/components/WhatsAppReportsTab';
import { MetricsObjectivesTab } from '@/components/MetricsObjectivesTab';
import { SettingsTab } from '@/components/SettingsTab';
import { TicketsTab } from '@/components/TicketsTab';
import { CreativesTab } from '@/components/CreativesTab';
import { ActivityLog } from '@/components/ActivityLog';
import { SidebarProvider } from '@/components/ui/sidebar';
import { UserMenu } from '@/components/UserMenu';
import { ClientGreeting } from '@/components/ClientGreeting';
// import { EmergencyLogout } from '@/components/EmergencyLogout';
import { useAuth } from '@/hooks/useAuth';

interface IndexProps {
  initialTab?: string;
}

const Index = ({ initialTab = 'dashboard' }: IndexProps) => {
  const location = useLocation();
  const route = location.pathname.replace("/", "") || initialTab;
  const [activeTab, setActiveTab] = useState(route);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('cards');
  const { isAdmin, isRootAdmin, isCliente, hasPermission, loading, user } = useAuth();

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => {
          caches.delete(name);
        });
      });
    }
    localStorage.removeItem('react-query-cache');
  }, []);

  console.log('Index render - Auth state:', {
    isAdmin,
    isRootAdmin,
    isCliente,
    loading,
    hasPermission,
    user,
    hasAccessDashboard: hasPermission('access_dashboard')
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-400/20 to-purple-400/20"></div>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">Carregando...</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Preparando sua experiência</p>
          </div>
        </div>
        {/* {user && <EmergencyLogout />} */}
      </div>
    );
  }

  // Se tem usuário mas não consegue acessar dashboard E não é cliente, mostrar interface de emergência
  if (user && !hasPermission('access_dashboard') && !isCliente && !isRootAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-red-50 to-orange-50 dark:from-slate-900 dark:via-red-900/20 dark:to-orange-900/20">
        <div className="text-center space-y-6 p-8 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-2xl border border-slate-200/60 dark:border-slate-700/60">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">!</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">Sistema Bloqueado</h1>
            <p className="text-slate-600 dark:text-slate-400">Usuário sem permissões. Use o botão de emergência para resetar.</p>
          </div>
          {/* <EmergencyLogout /> */}
        </div>
      </div>
    );
  }

  const renderContent = () => {
    const contentClasses = "bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200/60 dark:border-slate-700/60 shadow-xl p-8";
    
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className={`space-y-8 ${contentClasses}`}>
            <Dashboard />
            {hasPermission('view_system_logs') && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                <div className="lg:col-span-2">
                  <ActivityLog />
                </div>
              </div>
            )}
          </div>
        );
      case 'campaigns':
        return hasPermission('access_paid_media') ? (
          <div className={contentClasses}>
            <CampaignsTab />
          </div>
        ) : (
          <div className={`text-center py-16 ${contentClasses}`}>
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
              <span className="text-white font-bold text-xl">×</span>
            </div>
            <h2 className="text-xl font-semibold text-slate-600 dark:text-slate-300 mb-2">Acesso Negado</h2>
            <p className="text-slate-500 dark:text-slate-400">Você não tem permissão para acessar Campanhas.</p>
          </div>
        );
      case 'adsets':
        return hasPermission('access_paid_media') ? (
          <div className={contentClasses}>
            <AdSetsTab />
          </div>
        ) : (
          <div className={`text-center py-16 ${contentClasses}`}>
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
              <span className="text-white font-bold text-xl">×</span>
            </div>
            <h2 className="text-xl font-semibold text-slate-600 dark:text-slate-300 mb-2">Acesso Negado</h2>
            <p className="text-slate-500 dark:text-slate-400">Você não tem permissão para acessar Conjuntos de Anúncios.</p>
          </div>
        );
      case 'ads':
        return hasPermission('access_paid_media') ? (
          <div className={contentClasses}>
            <AdsTab />
          </div>
        ) : (
          <div className={`text-center py-16 ${contentClasses}`}>
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
              <span className="text-white font-bold text-xl">×</span>
            </div>
            <h2 className="text-xl font-semibold text-slate-600 dark:text-slate-300 mb-2">Acesso Negado</h2>
            <p className="text-slate-500 dark:text-slate-400">Você não tem permissão para acessar Anúncios.</p>
          </div>
        );
      case 'relatorios':
        return hasPermission('access_client_reports') ? (
          <div className={contentClasses}>
            <RelatoriosTab />
          </div>
        ) : (
          <div className={`text-center py-16 ${contentClasses}`}>
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
              <span className="text-white font-bold text-xl">×</span>
            </div>
            <h2 className="text-xl font-semibold text-slate-600 dark:text-slate-300 mb-2">Acesso Negado</h2>
           <p className="text-slate-500 dark:text-slate-400">Você não tem permissão para acessar Relatórios.</p>
         </div>
       );
      case 'whatsapp-reports':
        return hasPermission('access_whatsapp') ? (
          <div className={contentClasses}>
            <WhatsAppReportsTab />
          </div>
        ) : (
          <div className={`text-center py-16 ${contentClasses}`}>
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
              <span className="text-white font-bold text-xl">×</span>
            </div>
            <h2 className="text-xl font-semibold text-slate-600 dark:text-slate-300 mb-2">Acesso Negado</h2>
            <p className="text-slate-500 dark:text-slate-400">Você não tem permissão para acessar Relatórios WhatsApp.</p>
          </div>
        );
      case 'metrics-objectives':
        return hasPermission('view_metrics') ? (
          <div className={contentClasses}>
            <MetricsObjectivesTab />
          </div>
        ) : (
          <div className={`text-center py-16 ${contentClasses}`}>
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
              <span className="text-white font-bold text-xl">×</span>
            </div>
            <h2 className="text-xl font-semibold text-slate-600 dark:text-slate-300 mb-2">Acesso Negado</h2>
            <p className="text-slate-500 dark:text-slate-400">Você não tem permissão para acessar Métricas.</p>
          </div>
        );
      case 'tickets':
        return (
          <div className={contentClasses}>
            <TicketsTab />
          </div>
        );
      case 'creatives':
        return (
          <div className={contentClasses}>
            <CreativesTab />
          </div>
        );
      case 'activity-log':
        return hasPermission('view_system_logs') ? (
          <div className={contentClasses}>
            <ActivityLog />
          </div>
        ) : (
          <div className={`text-center py-16 ${contentClasses}`}>
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
              <span className="text-white font-bold text-xl">×</span>
            </div>
            <h2 className="text-xl font-semibold text-slate-600 dark:text-slate-300 mb-2">Acesso Negado</h2>
            <p className="text-slate-500 dark:text-slate-400">Você não tem permissão para ver logs do sistema.</p>
          </div>
        );
      case 'settings':
        return (hasPermission('manage_api_settings') || hasPermission('manage_user_settings') || hasPermission('manage_collaborators') || isRootAdmin) ? (
          <div className={contentClasses}>
            <SettingsTab />
          </div>
        ) : (
          <div className={`text-center py-16 ${contentClasses}`}>
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
              <span className="text-white font-bold text-xl">×</span>
            </div>
            <h2 className="text-xl font-semibold text-slate-600 dark:text-slate-300 mb-2">Acesso Negado</h2>
            <p className="text-slate-500 dark:text-slate-400">Você não tem permissão para acessar Configurações.</p>
          </div>
        );
      default:
        return hasPermission('access_dashboard') ? (
          <div className={contentClasses}>
            <Dashboard />
          </div>
        ) : (
          <div className={`text-center py-16 ${contentClasses}`}>
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
              <span className="text-white font-bold text-xl">👋</span>
            </div>
            <h2 className="text-xl font-semibold text-slate-600 dark:text-slate-300 mb-2">Bem-vindo!</h2>
            <p className="text-slate-500 dark:text-slate-400">Entre em contato com o administrador para obter acesso.</p>
          </div>
        );
    }
  };

  const getPageTitle = () => {
    const titles: Record<string, string> = {
      'dashboard': 'Dashboard',
      'campaigns': 'Campanhas',
      'adsets': 'Conjuntos de Anúncios', 
      'ads': 'Anúncios',
      'relatorios': 'Relatórios',
      'whatsapp-reports': 'Relatórios WhatsApp',
      'metrics-objectives': 'Personalização de Métricas',
      'tickets': hasPermission('access_tasks') ? 'Gerenciar Chamados' : 'Meus Chamados',
      'creatives': hasPermission('access_creatives') ? 'Gerenciar Criativos' : 'Meus Criativos',
      'activity-log': 'Log de Atividades',
      'settings': 'Configurações'
    };
    return titles[activeTab] || 'Partner B2B Pro';
  };

  const showHeaderControls = isAdmin && !isCliente && ['campaigns', 'adsets', 'ads'].includes(activeTab);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        {/* Botão de logout de emergência - sempre visível se há usuário */}
        {/* {user && <EmergencyLogout />} */}
        
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <div className="border-b border-slate-200/60 dark:border-slate-700/60 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm shadow-sm">
            <div className="flex items-center justify-between">
              {showHeaderControls ? (
                <div className="flex-1">
                  <Header 
                    activeTab={activeTab} 
                    viewMode={viewMode} 
                    setViewMode={setViewMode} 
                  />
                </div>
              ) : (
                <div className="container-responsive py-6 flex items-center justify-between w-full">
                  <div className="flex items-center gap-6 min-w-0 flex-1">
                    <div className="min-w-0">
                      <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent truncate">
                        {getPageTitle()}
                      </h1>
                      <p className="text-sm text-slate-500 dark:text-slate-400 truncate font-medium">
                        {isCliente ? 'Área do Cliente' : 'Área Administrativa'}
                      </p>
                    </div>
                  </div>
                  {/* Show appropriate menu based on user type */}
                  <div className="flex items-center gap-3">
                    {isCliente ? <ClientGreeting /> : <UserMenu />}
                  </div>
                </div>
              )}
              {showHeaderControls && (
                <div className="pr-6">
                  <UserMenu />
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <div className="container-responsive py-8">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
