
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useFilters } from '@/hooks/dashboard_hooks/useFilters';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface SectionTabsProps {
  accounts: string[];
  data: any[];
}

const SectionTabs = ({ accounts, data }: SectionTabsProps) => {
  const { filters, updateFilters } = useFilters();

  return (
    <div className="border-b bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between py-4">
          
          {/* Filters */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="w-full sm:w-64">
              <Select value={filters.selectedAccount} onValueChange={(value) => updateFilters({ selectedAccount: value })}>
                <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 h-9">
                  <SelectValue placeholder="Todas as contas" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <SelectItem value="all">Todas as contas</SelectItem>
                  {accounts.map((account) => (
                    <SelectItem key={account} value={account}>
                      {account}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar campanhas..."
                value={filters.searchTerm}
                onChange={(e) => updateFilters({ searchTerm: e.target.value })}
                className="pl-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 h-9"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {data.length} campanhas encontradas
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionTabs;
