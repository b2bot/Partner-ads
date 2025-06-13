
import { useState } from 'react';
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
import { SidebarProvider } from '@/components/ui/sidebar';
import { UserMenu } from '@/components/UserMenu';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('cards');
  const { isAdmin, loading } = useAuth();

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'campaigns':
        return isAdmin ? <CampaignsTab viewMode={viewMode} /> : <Dashboard />;
      case 'adsets':
        return isAdmin ? <AdSetsTab viewMode={viewMode} /> : <Dashboard />;
      case 'ads':
        return isAdmin ? <AdsTab viewMode={viewMode} /> : <Dashboard />;
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
      case 'settings':
        return isAdmin ? <SettingsTab /> : <Dashboard />;
      default:
        return <Dashboard />;
    }
  };

  const shouldShowHeader = isAdmin && ['campaigns', 'adsets', 'ads'].includes(activeTab);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-blue-50">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header sempre presente */}
          <div className="border-b bg-white/50 backdrop-blur-sm">
            <div className="flex items-center justify-between p-4">
              {shouldShowHeader ? (
                <>
                  <Header 
                    activeTab={activeTab} 
                    viewMode={viewMode} 
                    setViewMode={setViewMode} 
                  />
                  <UserMenu />
                </>
              ) : (
                <>
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    <div className="min-w-0">
                      <h1 className="text-2xl font-bold text-slate-800 truncate">
                        {activeTab === 'dashboard' && 'Dashboard'}
                        {activeTab === 'tickets' && (isAdmin ? 'Gerenciar Chamados' : 'Meus Chamados')}
                        {activeTab === 'creatives' && (isAdmin ? 'Gerenciar Criativos' : 'Meus Criativos')}
                        {activeTab === 'clients-management' && 'Gerenciar Clientes'}
                        {activeTab === 'settings' && 'Configurações'}
                        {activeTab === 'whatsapp-reports' && 'Relatórios WhatsApp'}
                        {activeTab === 'metrics-objectives' && 'Métricas e Objetivos'}
                      </h1>
                      <p className="text-sm text-slate-500 truncate">
                        {isAdmin ? 'Área Administrativa' : 'Área do Cliente'}
                      </p>
                    </div>
                  </div>
                  <UserMenu />
                </>
              )}
            </div>
          </div>

          {/* Conteúdo principal */}
          <main className="flex-1 p-4 lg:p-6 overflow-auto">
            <div className="max-w-full">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
