
import React from 'react';
import DateRangePicker from '@/components/dashboard_filters/DateRangePicker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DateRange } from '@/hooks/dashboard_hooks/useFilters';

interface DashboardFiltersProps {
  accounts: string[];
  selectedAccount: string;
  onAccountChange: (account: string) => void;
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
}

const DashboardFilters = ({
  accounts,
  selectedAccount,
  onAccountChange,
  dateRange,
  onDateRangeChange,
  searchTerm,
  onSearchTermChange
}: DashboardFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <div className="w-full sm:w-64">
        <Select value={selectedAccount} onValueChange={onAccountChange}>
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

      <DateRangePicker 
        dateRange={dateRange} 
        onDateRangeChange={onDateRangeChange} 
      />
    </div>
  );
};

export default DashboardFilters;
