
import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Dashboard } from '@/components/Dashboard';
import { CampaignsTab } from '@/components/CampaignsTab';
import { AdSetsTab } from '@/components/AdSetsTab';
import { AdsTab } from '@/components/AdsTab';
import { WhatsAppReportsTab } from '@/components/WhatsAppReportsTab';
import { TicketsTab } from '@/components/TicketsTab';
import { CreativesTab } from '@/components/CreativesTab';
import { MetricsObjectivesTab } from '@/components/MetricsObjectivesTab';
import { ActivityLog } from '@/components/ActivityLog';
import { SettingsTab } from '@/components/SettingsTab';
import { ClientsManagementTab } from '@/components/ClientsManagementTab';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { EmergencyLogout } from '@/components/EmergencyLogout';
import { useAuth } from '@/hooks/useAuth';
import MetricasTab from '@/components/MetricasTab';
import { SidebarProvider } from "@/components/ui/sidebar"; // este é o correto
import { Sidebar } from "@/components/Sidebar"; // componente visual personalizado


const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const { isAdmin, isCliente } = useAuth();

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard viewMode={viewMode} />;
      case 'campaigns':
        return <CampaignsTab viewMode={viewMode} />;
      case 'adsets':
        return <AdSetsTab viewMode={viewMode} />;
      case 'ads':
        return <AdsTab viewMode={viewMode} />;
      case 'metricas':
        return <MetricasTab />;
      case 'whatsapp-reports':
        return <WhatsAppReportsTab />;
      case 'tickets':
        return <TicketsTab />;
      case 'creatives':
        return <CreativesTab />;
      case 'metrics-objectives':
        return <MetricsObjectivesTab />;
      case 'activity-log':
        return <ActivityLog />;
      case 'settings':
        return <SettingsTab />;
      case 'clients-management':
        return <ClientsManagementTab />;
      default:
        return <Dashboard viewMode={viewMode} />;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header 
            activeTab={activeTab}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
        
          <main className="flex-1 overflow-x-hidden overflow-y-auto">
            <div className="container-responsive py-4">
              {renderActiveTab()}
            </div>
          </main>
        </div>

        <EmergencyLogout />
      </div>
    </SidebarProvider>  
  );
};

export default Index;
