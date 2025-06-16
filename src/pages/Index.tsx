
import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { Dashboard } from '@/components/Dashboard';
import { CampaignsTab } from '@/components/CampaignsTab';
import { AdSetsTab } from '@/components/AdSetsTab';
import { AdsTab } from '@/components/AdsTab';
import { WhatsAppReportsTab } from '@/components/WhatsAppReportsTab';
import { MetricsObjectivesTab } from '@/components/MetricsObjectivesTab';
import { SettingsTab } from '@/components/SettingsTab';
import { TicketsTab } from '@/components/TicketsTab';
import { CreativesTab } from '@/components/CreativesTab';
import { ClientsManagementTab } from '@/components/ClientsManagementTab';
import { ActivityLog } from '@/components/ActivityLog';
import { SidebarProvider } from '@/components/ui/sidebar';
import { UserMenu } from '@/components/UserMenu';
import { ClientGreeting } from '@/components/ClientGreeting';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('cards');
  const { isAdmin, isCliente, loading } = useAuth();

  // Initialize dark mode from localStorage
  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <Dashboard />
            {isAdmin && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <ActivityLog />
                </div>
              </div>
            )}
          </div>
        );
      case 'campaigns':
        return isAdmin ? <CampaignsTab /> : <Dashboard />;
      case 'adsets':
        return isAdmin ? <AdSetsTab /> : <Dashboard />;
      case 'ads':
        return isAdmin ? <AdsTab /> : <Dashboard />;
      case 'whatsapp-reports':
        return isAdmin ? <WhatsAppReportsTab /> : <Dashboard />;
      case 'metrics-objectives':
        return isAdmin ? <MetricsObjectivesTab /> : <Dashboard />;
      case 'tickets':
        return <TicketsTab />;
      case 'creatives':
        return <CreativesTab />;
      case 'clients-management':
        return isAdmin ? <ClientsManagementTab /> : <Dashboard />;
      case 'activity-log':
        return isAdmin ? <ActivityLog /> : <Dashboard />;
      case 'settings':
        return isAdmin ? <SettingsTab /> : <Dashboard />;
      default:
        return <Dashboard />;
    }
  };

  const getPageTitle = () => {
    const titles: Record<string, string> = {
      'dashboard': 'Dashboard',
      'campaigns': 'Campanhas',
      'adsets': 'Conjuntos de Anúncios', 
      'ads': 'Anúncios',
      'whatsapp-reports': 'Relatórios WhatsApp',
      'metrics-objectives': 'Personalização de Métricas',
      'tickets': isAdmin ? 'Gerenciar Chamados' : 'Meus Chamados',
      'creatives': isAdmin ? 'Gerenciar Criativos' : 'Meus Criativos',
      'clients-management': 'Gerenciar Clientes',
      'activity-log': 'Log de Atividades',
      'settings': 'Configurações'
    };
    return titles[activeTab] || 'Meta Ads Pro';
  };

  const showHeaderControls = isAdmin && ['campaigns', 'adsets', 'ads'].includes(activeTab);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <div className="border-b bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
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
                <div className="container-responsive py-3 flex items-center justify-between w-full">
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    <div className="min-w-0">
                      <h1 className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                        {getPageTitle()}
                      </h1>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {isAdmin ? 'Área Administrativa' : 'Área do Cliente'}
                      </p>
                    </div>
                  </div>
                  {/* Show appropriate menu based on user type */}
                  {isCliente ? <ClientGreeting /> : <UserMenu />}
                </div>
              )}
              {showHeaderControls && (
                <div className="pr-4">
                  <UserMenu />
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <div className="container-responsive py-4">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
