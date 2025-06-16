
import { AuthWrapper } from "@/components/AuthWrapper";
import { Dashboard } from "@/components/Dashboard";
import { Header } from "@/components/Header";
import { AppSidebar } from "@/components/AppSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { CampaignsTab } from "@/components/CampaignsTab";
import { AdSetsTab } from "@/components/AdSetsTab";
import { AdsTab } from "@/components/AdsTab";
import { CreativesTab } from "@/components/CreativesTab";
import { TicketsTab } from "@/components/TicketsTab";
import { ClientsManagementTab } from "@/components/ClientsManagementTab";
import { SettingsTab } from "@/components/SettingsTab";
import { TasksTab } from "@/components/tasks/TasksTab";
import { WhatsAppDashboard } from "@/components/whatsapp/WhatsAppDashboard";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

const Index = () => {
  const { isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  return (
    <AuthWrapper>
      <SidebarProvider>
        <div className="min-h-screen bg-gray-50 w-full flex">
          <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />
          <SidebarInset className="flex-1">
            <Header 
              activeTab={activeTab}
              viewMode={viewMode}
              setViewMode={setViewMode}
            />
            <main className="flex-1 p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsContent value="dashboard">
                  <Dashboard />
                </TabsContent>
                <TabsContent value="campaigns">
                  <CampaignsTab />
                </TabsContent>
                <TabsContent value="adsets">
                  <AdSetsTab />
                </TabsContent>
                <TabsContent value="ads">
                  <AdsTab />
                </TabsContent>
                <TabsContent value="creatives">
                  <CreativesTab />
                </TabsContent>
                <TabsContent value="tasks">
                  <TasksTab />
                </TabsContent>
                <TabsContent value="tickets">
                  <TicketsTab />
                </TabsContent>
                <TabsContent value="whatsapp">
                  <WhatsAppDashboard />
                </TabsContent>
                {isAdmin && (
                  <>
                    <TabsContent value="clients">
                      <ClientsManagementTab />
                    </TabsContent>
                    <TabsContent value="settings">
                      <SettingsTab />
                    </TabsContent>
                  </>
                )}
              </Tabs>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </AuthWrapper>
  );
};

export default Index;
