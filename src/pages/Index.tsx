
import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/ui/AppSidebar';
import MetricsDashboard from './dashboard/MetricsDashboard';
import { FiltersProvider } from '@/hooks/dashboard_hooks/useFilters';

const Index = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <FiltersProvider>
            <MetricsDashboard />
          </FiltersProvider>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;
