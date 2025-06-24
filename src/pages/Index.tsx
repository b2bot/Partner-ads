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
import { EmergencyLogout } from '@/components/EmergencyLogout';
import { useAuth } from '@/hooks/useAuth';
import { TasksTab } from '@/components/task/TasksTab';

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
      <div className="min-h-screen flex items-center justify-center gradient-surface">
        <div className="flex flex-col items-center space-y-8 animate-fade-in">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-200 border-t-blue-600 shadow-xl"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-400/20 via-purple-400/20 to-indigo-400/20"></div>
          </div>
          <div className="text-center premium-card p-8">
            <h3 className="text-heading-4 text-slate-700 dark:text-slate-300 mb-2">Carregando...</h3>
            <p className="text-body-small text-slate-500 dark:text-slate-400">Preparando sua experiência premium</p>
          </div>
        </div>
        {user && <EmergencyLogout />}
      </div>
    );
  }

  // Se tem usuário mas não consegue acessar dashboard e não é cliente, mostrar interface de emergência
  if (user && !hasPermission('access_dashboard') && !isCliente && !isRootAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-red-50 to-orange-50 dark:from-slate-900 dark:via-red-900/20 dark:to-orange-900/20">
        <div className="text-center space-y-8 premium-card p-12 max-w-md animate-scale-in">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-2xl">
            <span className="text-white font-bold text-2xl">!</span>
          </div>
          <div>
            <h1 className="text-heading-3 text-slate-800 dark:text-slate-200 mb-4">Sistema Bloqueado</h1>
            <p className="text-body text-slate-600 dark:text-slate-400 leading-relaxed">
              Usuário sem permissões adequadas. Entre em contato com o administrador para obter acesso.
            </p>
          </div>
          <EmergencyLogout />
        </div>
      </div>
    );
  }

  const renderContent = () => {
    const contentClasses = "premium-surface animate-fade-in";
    
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className={`space-y-10 ${contentClasses}`}>
            <Dashboard />
            {hasPermission('view_system_logs') && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">
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
          <div className={`text-center py-20 ${contentClasses}`}>
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-2xl">
              <span className="text-white font-bold text-2xl">×</span>
            </div>
            <h2 className="text-heading-3 text-slate-600 dark:text-slate-300 mb-4">Acesso Negado</h2>
            <p className="text-body text-slate-500 dark:text-slate-400">Você não tem permissão para acessar Campanhas.</p>
          </div>
        );
      case 'adsets':
        return hasPermission('access_paid_media') ? (
          <div className={contentClasses}>
            <AdSetsTab />
          </div>
        ) : (
          <div className={`text-center py-20 ${contentClasses}`}>
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-2xl">
              <span className="text-white font-bold text-2xl">×</span>
            </div>
            <h2 className="text-heading-3 text-slate-600 dark:text-slate-300 mb-4">Acesso Negado</h2>
            <p className="text-body text-slate-500 dark:text-slate-400">Você não tem permissão para acessar Conjuntos de Anúncios.</p>
          </div>
        );
      case 'ads':
        return hasPermission('access_paid_media') ? (
          <div className={contentClasses}>
            <AdsTab />
          </div>
        ) : (
          <div className={`text-center py-20 ${contentClasses}`}>
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-2xl">
              <span className="text-white font-bold text-2xl">×</span>
            </div>
            <h2 className="text-heading-3 text-slate-600 dark:text-slate-300 mb-4">Acesso Negado</h2>
            <p className="text-body text-slate-500 dark:text-slate-400">Você não tem permissão para acessar Anúncios.</p>
          </div>
        );
	  case 'relatorios':
        return hasPermission('access_client_reports') ? (
          <div className={contentClasses}>
		    <RelatoriosTab />
		  </div>
        ) : (
          <div className={`text-center py-20 ${contentClasses}`}>
            <h2 className="text-heading-3 text-slate-600 dark:text-slate-300 mb-4">Acesso Negado</h2>
            <p className="text-slate-500 dark:text-slate-400">Você não tem permissão para acessar Relatórios.</p>
          </div>
        );
      case 'whatsapp-reports':
        return hasPermission('access_whatsapp') ? (
          <div className={contentClasses}>
            <WhatsAppReportsTab />
          </div>
        ) : (
          <div className={`text-center py-20 ${contentClasses}`}>
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-2xl">
              <span className="text-white font-bold text-2xl">×</span>
            </div>
            <h2 className="text-heading-3 text-slate-600 dark:text-slate-300 mb-4">Acesso Negado</h2>
            <p className="text-body text-slate-500 dark:text-slate-400">Você não tem permissão para acessar Relatórios WhatsApp.</p>
          </div>
        );
      case 'metrics-objectives':
        return hasPermission('view_metrics') ? (
          <div className={contentClasses}>
            <MetricsObjectivesTab />
          </div>
        ) : (
          <div className={`text-center py-20 ${contentClasses}`}>
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-2xl">
              <span className="text-white font-bold text-2xl">×</span>
            </div>
            <h2 className="text-heading-3 text-slate-600 dark:text-slate-300 mb-4">Acesso Negado</h2>
            <p className="text-body text-slate-500 dark:text-slate-400">Você não tem permissão para acessar Métricas.</p>
          </div>
        );
      case 'tickets':
        return (
          <div className={contentClasses}>
            <TicketsTab />
          </div>
        );
      case 'tasks':
        return hasPermission('access_tasks') ? (
          <div className={contentClasses}>
            <TasksTab />
          </div>
        ) : (
          <div className={`text-center py-20 ${contentClasses}`}>
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-2xl">
              <span className="text-white font-bold text-2xl">×</span>
            </div>
            <h2 className="text-heading-3 text-slate-600 dark:text-slate-300 mb-4">Acesso Negado</h2>
            <p className="text-body text-slate-500 dark:text-slate-400">Você não tem permissão para acessar Tarefas.</p>
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
          <div className={`text-center py-20 ${contentClasses}`}>
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-2xl">
              <span className="text-white font-bold text-2xl">×</span>
            </div>
            <h2 className="text-heading-3 text-slate-600 dark:text-slate-300 mb-4">Acesso Negado</h2>
            <p className="text-body text-slate-500 dark:text-slate-400">Você não tem permissão para ver logs do sistema.</p>
          </div>
        );
      case 'settings':
        return (hasPermission('manage_api_settings') || hasPermission('manage_user_settings') || hasPermission('manage_collaborators') || isRootAdmin) ? (
          <div className={contentClasses}>
            <SettingsTab />
          </div>
        ) : (
          <div className={`text-center py-20 ${contentClasses}`}>
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-2xl">
              <span className="text-white font-bold text-2xl">×</span>
            </div>
            <h2 className="text-heading-3 text-slate-600 dark:text-slate-300 mb-4">Acesso Negado</h2>
            <p className="text-body text-slate-500 dark:text-slate-400">Você não tem permissão para acessar Configurações.</p>
          </div>
        );
      default:
        return hasPermission('access_dashboard') ? (
          <div className={contentClasses}>
            <Dashboard />
          </div>
        ) : (
          <div className={`text-center py-20 ${contentClasses}`}>
            <div className="w-20 h-20 mx-auto gradient-primary rounded-2xl flex items-center justify-center mb-6 shadow-2xl">
              <span className="text-white font-bold text-2xl">👋</span>
            </div>
            <h2 className="text-heading-3 text-slate-600 dark:text-slate-300 mb-4">Bem-vindo!</h2>
            <p className="text-body text-slate-500 dark:text-slate-400">Entre em contato com o administrador para obter acesso.</p>
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
      'tasks': 'Tarefas',
      'creatives': hasPermission('access_creatives') ? 'Gerenciar Criativos' : 'Meus Criativos',
      'activity-log': 'Log de Atividades',
      'settings': 'Configurações'
    };
    return titles[activeTab] || 'Partner B2B Pro';
  };

  const showHeaderControls = isAdmin && !isCliente && ['campaigns', 'adsets', 'ads'].includes(activeTab);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full gradient-surface">
        {/* Botão de logout de emergência - sempre visível se há usuário */}
        {/* {user && <EmergencyLogout />} */}
        
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <div className="premium-header border-b border-slate-200/60 dark:border-slate-700/60 shadow-sm">
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
                <div className="premium-container py-4 flex items-center justify-between w-full">
                  <div className="flex items-center gap-8 min-w-0 flex-1">
                    <div className="min-w-0">
                      <h1 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                        {getPageTitle()}
                      </h1>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {isCliente ? 'Área do Cliente' : 'Área Administrativa'}
                      </p>
                    </div>
                  </div>
                  {/* Show appropriate menu based on user type */}
                  <div className="flex items-center gap-4">
                    {isCliente ? <ClientGreeting /> : <UserMenu />}
                  </div>
                </div>
              )}
              {showHeaderControls && (
                <div className="pr-8">
                  <UserMenu />
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <div className="w-full px-0 py-0">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
