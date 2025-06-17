
import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/ui/sidebar';
import MetricsDashboard from './dashboard/MetricsDashboard';
import { FiltersProvider } from '@/hooks/dashboard_hooks/useFilters';

const Index = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <FiltersProvider>
          <MetricsDashboard />
        </FiltersProvider>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Index;
