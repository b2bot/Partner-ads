
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { usePlatformNavigation } from '@/hooks/dashboard_hooks/usePlatformNavigation';
import { useFilters } from '@/hooks/dashboard_hooks/useFilters';
import DashboardFilters from '@/components/dashboard/DashboardFilters';
import AdvancedFilters from '@/components/dashboard_filters/AdvancedFilters';
import ItemLevelFilter from '@/components/dashboard_filters/ItemLevelFilter';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Filter, Search } from 'lucide-react';

interface SectionTabsProps {
  accounts: string[];
  data: any[];
}

const SectionTabs = ({ accounts, data }: SectionTabsProps) => {
  const { section, setSection, platform } = usePlatformNavigation();
  const { filters, updateFilters } = useFilters();

  const sections = [
    { key: 'campanhas', label: 'Campanhas', count: data?.length || 0 },
    { key: 'grupos', label: 'Grupos de Anúncios', count: data?.length || 0 },
    { key: 'anuncios', label: 'Anúncios', count: data?.length || 0 },
  ];

  if (platform === 'relatorios') {
    sections.push(
      { key: 'observacoes', label: 'Observações', count: 0 },
      { key: 'relatorio-diario', label: 'Relatório Diário', count: 0 }
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Tabs value={section} onValueChange={setSection} className="w-full">
          <div className="flex items-center justify-between py-4">
            <TabsList className="grid w-full max-w-2xl grid-cols-3 lg:grid-cols-5">
              {sections.map(({ key, label, count }) => (
                <TabsTrigger 
                  key={key} 
                  value={key}
                  className={cn(
                    "data-[state=active]:bg-blue-600 data-[state=active]:text-white",
                    "hover:bg-gray-100 dark:hover:bg-gray-800"
                  )}
                >
                  <span className="hidden sm:inline">{label}</span>
                  <span className="sm:hidden">{label.split(' ')[0]}</span>
                  {count > 0 && (
                    <Badge variant="outline" className="ml-2 text-xs">
                      {count}
                    </Badge>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
            </div>
          </div>

          <div className="pb-4">
            <DashboardFilters
              accounts={accounts}
              selectedAccount={filters.selectedAccount}
              onAccountChange={(account) => updateFilters({ selectedAccount: account })}
              dateRange={filters.dateRange}
              onDateRangeChange={(range) => updateFilters({ dateRange: range })}
              searchTerm={filters.searchTerm}
              onSearchTermChange={(term) => updateFilters({ searchTerm: term })}
            />
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default SectionTabs;
