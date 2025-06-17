
import React, { useMemo } from 'react';
import PlatformNavigation from '@/components/dashboard_navigation/PlatformNavigation';
import SectionTabs from '@/components/dashboard_navigation/SectionTabs';
import MetricsGrid from '@/components/dashboard/MetricsGrid';
import { useMetaAPI } from '@/api/metaAPI';
import { useGoogleAPI } from '@/api/googleAPI';
import { useFilters } from '@/hooks/dashboard_hooks/useFilters';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, AlertCircle } from 'lucide-react';

const MetricsDashboard = () => {
  // Get data from APIs
  const { data: metaData = [], isLoading: metaLoading, error: metaError } = useMetaAPI();
  const { data: googleData = [], isLoading: googleLoading, error: googleError } = useGoogleAPI();
  
  const { filters } = useFilters();
  
  // Combine data from both APIs
  const combinedData = useMemo(() => {
    return [...metaData, ...googleData];
  }, [metaData, googleData]);

  const isLoading = metaLoading || googleLoading;
  const error = metaError || googleError;

  // Apply filters to data
  const filteredData = combinedData?.filter(row => {
    // Account filter
    if (filters.selectedAccount !== 'all' && row.accountName !== filters.selectedAccount) return false;
    
    // Search filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      const searchableText = row.campaignName?.toLowerCase() || '';
      if (!searchableText.includes(searchLower)) return false;
    }
    
    return true;
  }) || [];

  const uniqueAccounts = useMemo(
    () => [...new Set(combinedData.map((r) => r.accountName).filter(Boolean))] as string[],
    [combinedData]
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 transition-colors duration-300">
        <PlatformNavigation />
        <SectionTabs accounts={[]} data={[]} />
        <main className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm mt-8">
            <CardContent className="flex items-center justify-center py-12">
              <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Carregando insights...</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Conectando com as plataformas</p>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-orange-50 dark:from-gray-900 dark:via-red-900 dark:to-orange-900 transition-colors duration-300">
        <PlatformNavigation />
        <SectionTabs accounts={[]} data={[]} />
        <main className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-6">
          <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-red-200 dark:border-red-700 mt-4">
            <CardContent className="flex items-center justify-center py-12">
              <div className="text-center">
                <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Erro ao carregar dados</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-2 text-sm">Não foi possível conectar com as plataformas</p>
                <p className="text-sm text-red-600 dark:text-red-400">{error.message}</p>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 transition-colors duration-300">
      <PlatformNavigation />
      <SectionTabs accounts={uniqueAccounts} data={filteredData} />
      
      <main className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-4 pb-8">
          <MetricsGrid data={filteredData} section="campanhas" />
        </div>
      </main>
    </div>
  );
};

export default MetricsDashboard;
