
import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Filter, X, Megaphone, Target, Users } from 'lucide-react';
import { useMetaData } from '@/hooks/useMetaData';
import { CollapsibleAccountFilter } from './CollapsibleAccountFilter';

interface DynamicFiltersProps {
  type: 'campaigns' | 'adsets' | 'ads';
  onFiltersChange: (filters: any) => void;
  inheritedFilters?: {
    account?: string;
    campaign?: string;
    adset?: string;
  };
}

export function DynamicFilters({ type, onFiltersChange, inheritedFilters = {} }: DynamicFiltersProps) {
  const { campaigns, adSets, ads, selectedAdAccount, setSelectedAdAccount } = useMetaData();
  const [filters, setFilters] = useState({
    search: '',
    account: inheritedFilters.account || selectedAdAccount || '',
    campaign: inheritedFilters.campaign || 'all',
    adset: inheritedFilters.adset || 'all',
    status: 'all',
    dateRange: 'last_7_days',
  });

  useEffect(() => {
    // Update account filter when global account changes
    if (selectedAdAccount && !inheritedFilters.account) {
      setFilters(prev => ({ ...prev, account: selectedAdAccount }));
    }
  }, [selectedAdAccount, inheritedFilters.account]);

  useEffect(() => {
    onFiltersChange(filters);
  }, [filters, onFiltersChange]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => {
      const newFilters = { ...prev, [key]: value };
      
      // Clear dependent filters when parent changes
      if (key === 'account') {
        newFilters.campaign = 'all';
        newFilters.adset = 'all';
        // Update global account selection
        setSelectedAdAccount(value);
      } else if (key === 'campaign') {
        newFilters.adset = 'all';
      }
      
      return newFilters;
    });
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      account: selectedAdAccount || '',
      campaign: 'all',
      adset: 'all',
      status: 'all',
      dateRange: 'last_7_days',
    });
  };

  const getFilteredCampaigns = () => {
    if (!filters.account) return campaigns;
    return campaigns.filter(campaign => campaign.account_id === filters.account);
  };

  const getFilteredAdSets = () => {
    let filtered = adSets;
    if (filters.account) {
      filtered = filtered.filter(adset => adset.account_id === filters.account);
    }
    if (filters.campaign && filters.campaign !== 'all') {
      filtered = filtered.filter(adset => adset.campaign_id === filters.campaign);
    }
    return filtered;
  };

  const getIcon = () => {
    switch (type) {
      case 'campaigns': return Megaphone;
      case 'adsets': return Target;
      case 'ads': return Users;
      default: return Filter;
    }
  };

  const Icon = getIcon();
  const typeLabel = type === 'campaigns' ? 'campanhas' : type === 'adsets' ? 'conjuntos' : 'anúncios';

  return (
    <div className="space-y-4">
      {/* Account Filter (Collapsible) */}
      <CollapsibleAccountFilter 
        selectedAccount={filters.account}
        onAccountChange={(accountId) => handleFilterChange('account', accountId)}
      />

      {/* Main Filters */}
      <Card className="border-slate-200 dark:border-slate-700">
        <CardContent className="p-4 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder={`Buscar ${typeLabel}...`}
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="pl-10 text-sm"
            />
          </div>

          {/* Specific Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Campaign Filter (for adsets and ads) */}
            {(type === 'adsets' || type === 'ads') && (
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1">
                  <Megaphone className="w-3 h-3" />
                  Campanha
                </label>
                <Select value={filters.campaign} onValueChange={(value) => handleFilterChange('campaign', value)}>
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder="Selecione uma campanha" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" disabled>Todas as campanhas</SelectItem>
                    {getFilteredCampaigns().map((campaign) => (
                      <SelectItem key={campaign.id} value={campaign.id}>
                        <span className="truncate">{campaign.name}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* AdSet Filter (only for ads) */}
            {type === 'ads' && (
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1">
                  <Target className="w-3 h-3" />
                  Conjunto
                </label>
                <Select value={filters.adset} onValueChange={(value) => handleFilterChange('adset', value)}>
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder="Selecione um conjunto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" disabled>Todos os conjuntos</SelectItem>
                    {getFilteredAdSets().map((adset) => (
                      <SelectItem key={adset.id} value={adset.id}>
                        <span className="truncate">{adset.name}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Status Filter */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-600 dark:text-slate-400">
                Status
              </label>
              <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
                <SelectTrigger className="text-sm">
                  <SelectValue placeholder="Selecione um status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" disabled>Todos os status</SelectItem>
                  <SelectItem value="ACTIVE">Ativo</SelectItem>
                  <SelectItem value="PAUSED">Pausado</SelectItem>
                  <SelectItem value="ARCHIVED">Arquivado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Clear filters button */}
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="text-xs"
            >
              <X className="h-3 w-3 mr-1" />
              Limpar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
