
import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/ui/AppSidebar';
import MetricsDashboard from '@/pages/dashboard/MetricsDashboard';
import { FiltersProvider } from '@/hooks/dashboard_hooks/useFilters';

const MetricasTab = () => {
  return (
    <div className="h-full">
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
    </div>
  );
};

export default MetricasTab;
