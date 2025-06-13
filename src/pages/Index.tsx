
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
import { SidebarProvider } from '@/components/ui/sidebar';
import { UserMenu } from '@/components/UserMenu';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('cards');
  const { isAdmin } = useAuth();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'campaigns':
        return <CampaignsTab viewMode={viewMode} />;
      case 'adsets':
        return <AdSetsTab viewMode={viewMode} />;
      case 'ads':
        return <AdsTab viewMode={viewMode} />;
      case 'whatsapp-reports':
        return <WhatsAppReportsTab />;
      case 'metrics-objectives':
        return <MetricsObjectivesTab />;
      case 'tickets':
        return <TicketsTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-blue-50">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b bg-white/50 backdrop-blur-sm">
            <Header 
              activeTab={activeTab} 
              viewMode={viewMode} 
              setViewMode={setViewMode} 
            />
            <UserMenu />
          </div>
          <main className="flex-1 p-6 overflow-auto">
            {renderContent()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
